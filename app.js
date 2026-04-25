// State Management
const State = {
    currentPage: 'home',
    language: 'en',
    stats: {
        totalWaste: 1284,
        totalEnergy: 450,
        totalCO2: 85
    },
    requests: [],
    simulation: {
        active: false,
        step: 0,
        wasteAmount: 0,
        energyGenerated: 0
    }
};

const API_BASE = '/api';

// Translations
const Translations = {
    en: {
        home: "Home",
        analyze: "Analyze Waste",
        dashboard: "Dashboard",
        management: "Management",
        education: "Education",
        waste_system: "Waste System",
        pollution_effects: "Pollution Effects",
        ai_assistant: "AI Assistant",
        welcome: "Waste2Value Intelligence System",
        tagline: "Converting today's waste into tomorrow's energy through AI-driven intelligence.",
        waste_processed: "Waste Processed",
        energy_generated: "Energy Generated",
        co2_saved: "CO2 Saved",
        request_collection: "Request Garbage Collection",
        mark_collected: "Mark as Collected",
        start_processing: "Start Processing Simulation",
        language_updated: "Language updated to English",
        request_sent: "Request Sent",
        collected: "Collected",
        processing: "Processing..."
    },
    hi: {
        home: "होम",
        analyze: "कचरे का विश्लेषण",
        dashboard: "डैशबोर्ड",
        management: "प्रबंधन",
        education: "शिक्षा",
        waste_system: "अपशिष्ट प्रणाली",
        pollution_effects: "प्रदूषण के प्रभाव",
        ai_assistant: "एआई सहायक",
        welcome: "वेस्ट2वैल्यू इंटेलिजेंस सिस्टम",
        tagline: "एआई-संचालित बुद्धिमत्ता के माध्यम से आज के कचरे को कल की ऊर्जा में बदलना।",
        waste_processed: "संसाधित कचरा",
        energy_generated: "उत्पन्न ऊर्जा",
        co2_saved: "CO2 की बचत",
        request_collection: "कचरा संग्रहण का अनुरोध करें",
        mark_collected: "संग्रहित के रूप में चिह्नित करें",
        start_processing: "प्रसंस्करण सिमुलेशन शुरू करें",
        language_updated: "भाषा हिंदी में अपडेट की गई",
        request_sent: "अनुरोध भेजा गया",
        collected: "संग्रहित",
        processing: "प्रसंस्करण..."
    },
    ta: {
        home: "முகப்பு",
        analyze: "கழிவுகளை ஆய்வு செய்",
        dashboard: "டாஷ்போர்டு",
        management: "மேலாண்மை",
        education: "கல்வி",
        waste_system: "கழிவு அமைப்பு",
        pollution_effects: "மாசுபாட்டின் விளைவுகள்",
        ai_assistant: "AI உதவியாளர்",
        welcome: "Waste2Value நுண்ணறிவு அமைப்பு",
        tagline: "AI-உந்துதல் நுண்ணறிவு மூலம் இன்றைய கழிவுகளை நாளைய ஆற்றலாக மாற்றுகிறது.",
        waste_processed: "கழிவு சுத்திகரிக்கப்பட்டது",
        energy_generated: "ஆற்றல் உருவாக்கப்பட்டது",
        co2_saved: "CO2 சேமிக்கப்பட்டது",
        request_collection: "குப்பை சேகரிக்க கோரிக்கை விடுக்கவும்",
        mark_collected: "சேகரிக்கப்பட்டதாகக் குறிக்கவும்",
        start_processing: "செயலாக்க உருவகப்படுத்துதலைத் தொடங்கவும்",
        language_updated: "மொழி தமிழுக்கு மாற்றப்பட்டது",
        request_sent: "கோரிக்கை அனுப்பப்பட்டது",
        collected: "சேகரிக்கப்பட்டது",
        processing: "செயலாக்கம்..."
    },
    kn: {
        home: "ಮನೆ",
        analyze: "ಕಸ ವಿಶ್ಲೇಷಣೆ",
        dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
        management: "ನಿರ್ವಹಣೆ",
        education: "ಶಿಕ್ಷಣ",
        waste_system: "ಕಸದ ವ್ಯವಸ್ಥೆ",
        pollution_effects: "ಮಾಲಿನ್ಯದ ಪರಿಣಾಮಗಳು",
        ai_assistant: "AI ಸಹಾಯಕ",
        welcome: "Waste2Value ಇಂಟೆಲಿಜೆನ್ಸ್ ಸಿಸ್ಟಮ್",
        tagline: "AI-ಚಾಲಿತ ಬುದ್ಧಿವಂತಿಕೆಯ ಮೂಲಕ ಇಂದಿನ ಕಸವನ್ನು ನಾಳೆಯ ಶಕ್ತಿಯನ್ನಾಗಿ ಪರಿವರ್ತಿಸುವುದು.",
        waste_processed: "ಸಂಸ್ಕರಿಸಿದ ಕಸ",
        energy_generated: "ಉತ್ಪಾದಿತ ಶಕ್ತಿ",
        co2_saved: "CO2 ಉಳಿತಾಯ",
        request_collection: "ಕಸ ಸಂಗ್ರಹಣೆಗೆ ವಿನಂತಿಸಿ",
        mark_collected: "ಸಂಗ್ರಹಿಸಲಾಗಿದೆ ಎಂದು ಗುರುತಿಸಿ",
        start_processing: "ಸಂಸ್ಕರಣಾ ಸಿಮ್ಯುಲೇಶನ್ ಪ್ರಾರಂಭಿಸಿ",
        language_updated: "ಭಾಷೆ ಕನ್ನಡಕ್ಕೆ ನವೀಕರಿಸಲಾಗಿದೆ",
        request_sent: "ವಿನಂತಿ ಕಳುಹಿಸಲಾಗಿದೆ",
        collected: "ಸಂಗ್ರಹಿಸಲಾಗಿದೆ",
        processing: "ಸಂಸ್ಕರಿಸಲಾಗುತ್ತಿದೆ..."
    }
};

// UI Components
const Pages = {
    home: () => `
        <div class="page home-page">
            <header class="hero">
                <h1 data-t="welcome">${Translations[State.language].welcome}</h1>
                <p data-t="tagline">${Translations[State.language].tagline}</p>
            </header>
            
            <div class="stats-grid">
                <div class="card stat-card">
                    <div class="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div>
                    <div class="stat-info">
                        <h3>${State.stats.totalWaste.toFixed(1)} Tons</h3>
                        <p data-t="waste_processed">${Translations[State.language].waste_processed}</p>
                    </div>
                </div>
                <div class="card stat-card">
                    <div class="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg></div>
                    <div class="stat-info">
                        <h3>${State.stats.totalEnergy.toFixed(1)} MWh</h3>
                        <p data-t="energy_generated">${Translations[State.language].energy_generated}</p>
                    </div>
                </div>
                <div class="card stat-card">
                    <div class="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
                    <div class="stat-info">
                        <h3>${State.stats.totalCO2.toFixed(1)} Tons</h3>
                        <p data-t="co2_saved">${Translations[State.language].co2_saved}</p>
                    </div>
                </div>
            </div>

            <div id="home-actions" style="display: none; text-align: center; margin-top: 20px;">
                <button class="btn btn-primary" onclick="app.navigate('analyze')">Get Started &rarr;</button>
            </div>
        </div>
    `,
    analyze: () => `
        <div class="page">
            <h2 style="margin-bottom: 24px;">AI Waste Classification</h2>
            <div class="card" style="max-width: 600px; margin: 0 auto;">
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Waste Description</label>
                    <textarea id="waste-desc" placeholder="Describe the waste (e.g., plastic bottles, food scraps...)" style="width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px; min-height: 100px;"></textarea>
                </div>
                <div style="margin-bottom: 24px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Upload Image (Simulated)</label>
                    <input type="file" id="waste-img" style="display: none;">
                    <div onclick="document.getElementById('waste-img').click()" style="border: 2px dashed var(--border); padding: 30px; text-align: center; border-radius: 8px; cursor: pointer;">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--text-muted); margin-bottom: 10px;"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                        <p style="color: var(--text-muted);">Click to upload or drag waste image</p>
                    </div>
                </div>
                <button class="btn btn-primary" id="analyze-btn" style="width: 100%;">Classify Waste</button>
            </div>
            
            <div id="analysis-result" style="margin-top: 32px; display: none;">
                <div class="card" style="border-left: 4px solid var(--primary);">
                    <h3 id="result-type" style="margin-bottom: 12px;">Organic Waste</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div>
                            <p style="color: var(--text-muted); font-size: 0.875rem;">Energy Potential</p>
                            <p style="font-weight: 600;" id="result-energy">High (3.5 kWh/kg)</p>
                        </div>
                        <div>
                            <p style="color: var(--text-muted); font-size: 0.875rem;">Recycling Path</p>
                            <p style="font-weight: 600;" id="result-path">Biogas Digestion</p>
                        </div>
                    </div>
                    <button class="btn btn-primary" style="margin-top: 24px; width: 100%;" id="start-sim-btn">Process Waste in Simulation</button>
                </div>
            </div>
        </div>
    `,
    roles: () => {
        const pending = State.requests.filter(r => r.status === 'requested');
        const active = State.requests.filter(r => r.status === 'collected');
        
        return `
        <div class="page">
            <h2 style="margin-bottom: 32px;">Role-Based Management (Live Sync)</h2>
            <div class="stats-grid">
                <div class="card">
                    <h3 style="margin-bottom: 16px;">🏠 Home Owner</h3>
                    <p style="margin-bottom: 20px; color: var(--text-muted);">Request a pickup for your segregated waste.</p>
                    <button class="btn btn-primary" id="req-btn" style="width: 100%;">
                        <span data-t="request_collection">${Translations[State.language].request_collection}</span>
                    </button>
                </div>
                <div class="card">
                    <h3 style="margin-bottom: 16px;">🚛 Collector</h3>
                    <div id="collector-queue" style="margin-bottom: 20px;">
                        <div style="background: var(--background); padding: 12px; border-radius: 8px; font-size: 0.875rem;">
                            <strong>Pending Requests:</strong> ${pending.length > 0 ? pending.length + ' tasks in queue' : 'No pending requests'}
                        </div>
                        ${pending.length > 0 ? `<p style="font-size: 0.75rem; margin-top: 8px;">Next: ${pending[0].location}</p>` : ''}
                    </div>
                    <button class="btn btn-primary" id="collect-btn" style="width: 100%;" ${pending.length === 0 ? 'disabled' : ''}>
                        <span data-t="mark_collected">${Translations[State.language].mark_collected}</span>
                    </button>
                </div>
                <div class="card">
                    <h3 style="margin-bottom: 16px;">🏭 Processing Plant</h3>
                    <p style="margin-bottom: 20px; color: var(--text-muted);">Ready to convert collected waste to energy.</p>
                    <div style="background: var(--background); padding: 12px; border-radius: 8px; font-size: 0.875rem; margin-bottom: 20px;">
                        <strong>Collected:</strong> ${active.length > 0 ? active.length + ' tons ready' : 'Waiting for collection'}
                    </div>
                    <button class="btn btn-primary" id="plant-btn" style="width: 100%;" ${active.length === 0 ? 'disabled' : ''}>
                        <span data-t="start_processing">${Translations[State.language].start_processing}</span>
                    </button>
                </div>
            </div>
        </div>
    `},
    simulation: () => `
        <div class="page">
            <h2 style="margin-bottom: 24px;">Waste-to-Energy Simulation</h2>
            <div class="sim-container">
                <div class="sim-steps">
                    <div class="step-indicator" id="step-1">
                        <div class="step-dot">1</div>
                        <span style="font-size: 0.75rem;">Waste</span>
                    </div>
                    <div class="step-indicator" id="step-2">
                        <div class="step-dot">2</div>
                        <span style="font-size: 0.75rem;">Combust</span>
                    </div>
                    <div class="step-indicator" id="step-3">
                        <div class="step-dot">3</div>
                        <span style="font-size: 0.75rem;">Steam</span>
                    </div>
                    <div class="step-indicator" id="step-4">
                        <div class="step-dot">4</div>
                        <span style="font-size: 0.75rem;">Turbine</span>
                    </div>
                    <div class="step-indicator" id="step-5">
                        <div class="step-dot">5</div>
                        <span style="font-size: 0.75rem;">Power</span>
                    </div>
                </div>
                
                <div style="text-align: center;">
                    <div id="sim-visual" style="height: 200px; display: flex; align-items: center; justify-content: center; margin-bottom: 30px;">
                        <div class="loader" id="sim-loader" style="display:none;"></div>
                        <div id="sim-status-text" style="font-size: 1.5rem; font-weight: 600;">Ready to Start</div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                        <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 12px;">
                            <p style="font-size: 0.875rem; opacity: 0.7;">Current Power</p>
                            <h2 id="sim-power">0 kW</h2>
                        </div>
                        <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 12px;">
                            <p style="font-size: 0.875rem; opacity: 0.7;">Total Energy</p>
                            <h2 id="sim-energy">0 kWh</h2>
                        </div>
                    </div>
                    
                    <div style="height: 4px; background: #334155; border-radius: 2px; overflow: hidden; margin-bottom: 40px;">
                        <div id="sim-progress" style="width: 0%; height: 100%; background: var(--primary); transition: width 0.3s linear;"></div>
                    </div>
                    
                    <button class="btn btn-primary" id="start-engine-btn" style="padding: 16px 40px;">Start Simulation</button>
                </div>
            </div>
        </div>
    `,
    dashboard: () => `
        <div class="page">
            <h2 style="margin-bottom: 32px;">System Analytics</h2>
            <div class="stats-grid" style="margin-bottom: 32px;">
                <div class="card">
                    <canvas id="energyChart" height="200"></canvas>
                </div>
                <div class="card">
                    <canvas id="wasteChart" height="200"></canvas>
                </div>
            </div>
            <div class="card">
                <h3 style="margin-bottom: 16px;">Sustainability Impact</h3>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <p style="font-size: 2.5rem; font-weight: 700; color: var(--primary);">${(State.stats.totalCO2 / 0.02).toFixed(0)}</p>
                        <p style="color: var(--text-muted);">Trees Equivalent Saved</p>
                    </div>
                    <div>
                        <p style="font-size: 2.5rem; font-weight: 700; color: var(--accent);">${(State.stats.totalWaste * 0.01).toFixed(1)}t</p>
                        <p style="color: var(--text-muted);">Methane Reduced</p>
                    </div>
                </div>
            </div>
        </div>
    `,
    'edu-system': () => Pages['edu-system-template'],
    'edu-pollution': () => Pages['edu-pollution-template']
};

// Application Controller
const app = {
    async init() {
        this.bindEvents();
        await this.syncData();
        this.navigate('home');
        this.setupAI();
        
        // Start live sync interval
        setInterval(() => this.syncData(), 5000);

        setTimeout(() => {
            const actions = document.getElementById('home-actions');
            if (actions) actions.style.display = 'block';
        }, 1500);
    },

    async syncData() {
        try {
            const res = await fetch(`${API_BASE}/stats`);
            const data = await res.json();
            State.stats = data.stats;
            
            const reqRes = await fetch(`${API_BASE}/requests`);
            State.requests = await reqRes.json();
            
            // If on home or roles page, update dynamic parts
            if (State.currentPage === 'home' || State.currentPage === 'roles') {
                this.updateDynamicContent();
            }
        } catch (e) {
            console.error("Sync failed", e);
        }
    },

    bindEvents() {
        document.querySelectorAll('[data-page]').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigate(e.currentTarget.dataset.page);
            });
        });

        document.querySelectorAll('[data-lang]').forEach(el => {
            el.addEventListener('click', (e) => {
                this.setLanguage(e.currentTarget.dataset.lang);
            });
        });

        document.getElementById('mobile-menu-btn').addEventListener('click', () => {
            document.querySelector('.nav-links').classList.toggle('mobile-active');
        });
    },

    navigate(page) {
        State.currentPage = page;
        const container = document.getElementById('app-container');
        document.querySelectorAll('.nav-item').forEach(el => {
            el.classList.toggle('active', el.dataset.page === page);
        });

        container.innerHTML = Pages[page] ? Pages[page]() : Pages.home();
        this.initPageLogic(page);
        this.updateTranslations();
        window.scrollTo(0, 0);
    },

    updateDynamicContent() {
        // Simple strategy: re-render the current container if it's data-dependent
        const container = document.getElementById('app-container');
        if (State.currentPage === 'home' || State.currentPage === 'roles') {
             // Only re-render if user hasn't interacted in last 2 seconds to avoid flickering?
             // For a hackathon demo, simple re-render is fine.
             const currentHTML = Pages[State.currentPage]();
             // Optimization: only update if changed? 
             container.innerHTML = currentHTML;
             this.initPageLogic(State.currentPage);
             this.updateTranslations();
        }
    },

    initPageLogic(page) {
        if (page === 'analyze') {
            document.getElementById('analyze-btn').addEventListener('click', () => this.runAnalysis());
            document.getElementById('start-sim-btn')?.addEventListener('click', () => this.navigate('simulation'));
        }
        
        if (page === 'roles') {
            document.getElementById('req-btn')?.addEventListener('click', (e) => this.handleRoleAction('request', e.target));
            document.getElementById('collect-btn')?.addEventListener('click', (e) => this.handleRoleAction('collect', e.target));
            document.getElementById('plant-btn')?.addEventListener('click', (e) => this.handleRoleAction('plant', e.target));
        }
        
        if (page === 'simulation') {
            document.getElementById('start-engine-btn')?.addEventListener('click', () => this.runSimulation());
        }

        if (page === 'dashboard') {
            this.initCharts();
        }
    },

    setLanguage(lang) {
        State.language = lang;
        document.getElementById('current-lang').innerText = lang.toUpperCase();
        this.navigate(State.currentPage);
        this.showToast(Translations[lang].language_updated);
    },

    updateTranslations() {
        const lang = State.language;
        document.querySelectorAll('[data-t]').forEach(el => {
            const key = el.dataset.t;
            if (Translations[lang][key]) el.innerText = Translations[lang][key];
        });
        document.getElementById('nav-home').innerText = Translations[lang].home;
        document.getElementById('nav-analyze').innerText = Translations[lang].analyze;
        document.getElementById('nav-dashboard').innerText = Translations[lang].dashboard;
        document.getElementById('nav-roles').innerText = Translations[lang].management;
        document.getElementById('nav-edu').firstChild.textContent = Translations[lang].education + " ";
    },

    showToast(message) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerText = message;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    },

    async handleRoleAction(role, btn) {
        btn.disabled = true;
        const originalContent = btn.innerHTML;
        btn.innerHTML = `<div class="loader" style="width: 20px; height: 20px; border-width: 2px;"></div>`;
        
        try {
            if (role === 'request') {
                await fetch(`${API_BASE}/requests`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type: 'Mix' })
                });
                this.showToast("Request logged in backend!");
            } else if (role === 'collect') {
                const pending = State.requests.find(r => r.status === 'requested');
                if (pending) {
                    await fetch(`${API_BASE}/requests/${pending.id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ status: 'collected' })
                    });
                    this.showToast("Collector updated database!");
                }
            } else if (role === 'plant') {
                this.navigate('simulation');
                return;
            }
            await this.syncData();
        } catch (e) {
            console.error(e);
            btn.disabled = false;
            btn.innerHTML = originalContent;
        }
    },

    runSimulation() {
        const btn = document.getElementById('start-engine-btn');
        btn.disabled = true;
        const statusText = document.getElementById('sim-status-text');
        const progressBar = document.getElementById('sim-progress');
        const loader = document.getElementById('sim-loader');
        
        loader.style.display = 'block';
        
        const steps = [
            { id: 1, text: "Feeding Waste...", power: 10, energy: 0 },
            { id: 2, text: "Combusting Waste...", power: 85, energy: 5 },
            { id: 3, text: "Generating Steam...", power: 120, energy: 15 },
            { id: 4, text: "Spinning Turbine...", power: 450, energy: 45 },
            { id: 5, text: "Distributing Power...", power: 442, energy: 120 }
        ];

        let currentStep = 0;
        const interval = setInterval(async () => {
            if (currentStep >= steps.length) {
                clearInterval(interval);
                statusText.innerText = "Simulation Complete!";
                loader.style.display = 'none';
                
                // Save to backend
                await fetch(`${API_BASE}/simulation`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ power: 442, energy: 120, wasteType: 'Organic' })
                });
                
                // Clear one collected request if any
                const collected = State.requests.find(r => r.status === 'collected');
                if (collected) {
                    await fetch(`${API_BASE}/requests/${collected.id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ status: 'processed' })
                    });
                }

                this.showToast("Results saved to Database!");
                await this.syncData();
                return;
            }

            const step = steps[currentStep];
            statusText.innerText = step.text;
            progressBar.style.width = ((currentStep + 1) / steps.length * 100) + "%";
            document.getElementById(`step-${step.id}`).classList.add('active');
            if (currentStep > 0) document.getElementById(`step-${steps[currentStep-1].id}`).classList.add('completed');
            document.getElementById('sim-power').innerText = step.power + " kW";
            document.getElementById('sim-energy').innerText = step.energy + " kWh";
            currentStep++;
        }, 1500);
    },

    initCharts() {
        const ctxEnergy = document.getElementById('energyChart').getContext('2d');
        new Chart(ctxEnergy, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Energy Generation (MWh)',
                    data: [12, 19, 15, 25, 22, 30, 28],
                    borderColor: '#10b981',
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(16, 185, 129, 0.1)'
                }]
            }
        });
        const ctxWaste = document.getElementById('wasteChart').getContext('2d');
        new Chart(ctxWaste, {
            type: 'doughnut',
            data: {
                labels: ['Organic', 'Plastic', 'Metal', 'E-waste'],
                datasets: [{
                    data: [55, 25, 12, 8],
                    backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#6366f1']
                }]
            }
        });
    },

    setupAI() {
        const btn = document.getElementById('ai-chat-btn');
        const overlay = document.getElementById('ai-overlay');
        const close = document.getElementById('close-chat');
        const send = document.getElementById('send-msg');
        const input = document.getElementById('user-input');
        const messages = document.getElementById('chat-messages');

        btn.onclick = () => overlay.style.display = 'flex';
        close.onclick = () => overlay.style.display = 'none';

        const sendMessage = () => {
            const text = input.value.trim();
            if (!text) return;
            const msgDiv = document.createElement('div');
            msgDiv.className = 'message user';
            msgDiv.innerText = text;
            messages.appendChild(msgDiv);
            input.value = '';
            messages.scrollTop = messages.scrollHeight;
            setTimeout(() => {
                const botDiv = document.createElement('div');
                botDiv.className = 'message bot';
                botDiv.innerText = "Backend AI: This system reduces landfill waste by 90%. I'm connected to the live database!";
                messages.appendChild(botDiv);
                messages.scrollTop = messages.scrollHeight;
            }, 1000);
        };
        send.onclick = sendMessage;
        input.onkeypress = (e) => { if (e.key === 'Enter') sendMessage(); };
    }
};

// Static templates for education
Pages['edu-system-template'] = `
    <div class="page">
        <h2>Waste Management Lifecycle</h2>
        <div class="card">...Interactive Lifecycle Diagrams...</div>
    </div>
`;
Pages['edu-pollution-template'] = `
    <div class="page">
        <h2>Environmental Impacts</h2>
        <div class="card">...Comparison Visuals...</div>
    </div>
`;

window.app = app;
document.addEventListener('DOMContentLoaded', () => app.init());
