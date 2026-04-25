const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

const app = express();
const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ 
    requests: [], 
    simulations: [], 
    stats: { 
        totalWaste: 1284, 
        totalEnergy: 450, 
        totalCO2: 85 
    } 
}).write();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Root route fix
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// APIs...
app.get('/api/requests', (req, res) => {
    res.json(db.get('requests').value());
});

app.post('/api/requests', (req, res) => {
    const newRequest = {
        id: Date.now(),
        type: req.body.type || 'General',
        status: 'requested',
        timestamp: new Date().toISOString(),
        location: 'Sector ' + (Math.floor(Math.random() * 10) + 1)
    };
    db.get('requests').push(newRequest).write();
    res.status(201).json(newRequest);
});

app.patch('/api/requests/:id', (req, res) => {
    db.get('requests')
      .find({ id: parseInt(req.params.id) })
      .assign({ status: req.body.status })
      .write();
    res.json({ success: true });
});

app.post('/api/simulation', (req, res) => {
    const { power, energy, wasteType } = req.body;

    const newSim = {
        id: Date.now(),
        power,
        energy,
        wasteType,
        timestamp: new Date().toISOString()
    };

    db.get('simulations').push(newSim).write();

    const stats = db.get('stats').value();
    db.get('stats').assign({
        totalWaste: stats.totalWaste + 0.1,
        totalEnergy: stats.totalEnergy + parseFloat(energy),
        totalCO2: stats.totalCO2 + (parseFloat(energy) * 0.2)
    }).write();

    res.status(201).json(newSim);
});

app.get('/api/stats', (req, res) => {
    res.json({
        stats: db.get('stats').value(),
        simulations: db.get('simulations').takeRight(10).value()
    });
});

// ✅ FIXED PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
