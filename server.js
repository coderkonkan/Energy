const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

const app = express();
const adapter = new FileSync('db.json');
const db = low(adapter);

// Initial database state
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
app.use(express.static(path.join(__dirname))); // Serve frontend files

// API: Requests
app.get('/api/requests', (req, res) => {
    const requests = db.get('requests').value();
    res.json(requests);
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
    const { id } = req.params;
    const { status } = req.body;
    db.get('requests')
      .find({ id: parseInt(id) })
      .assign({ status })
      .write();
    res.json({ success: true });
});

// API: Simulations
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
    
    // Update global stats
    const stats = db.get('stats').value();
    db.get('stats').assign({
        totalWaste: stats.totalWaste + 0.1, // simulated increment
        totalEnergy: stats.totalEnergy + parseFloat(energy),
        totalCO2: stats.totalCO2 + (parseFloat(energy) * 0.2) // simulated CO2 saving
    }).write();
    
    res.status(201).json(newSim);
});

app.get('/api/stats', (req, res) => {
    const stats = db.get('stats').value();
    const simulations = db.get('simulations').takeRight(10).value();
    res.json({ stats, simulations });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Waste2Value Server running at http://localhost:${PORT}`);
});
