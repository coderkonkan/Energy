# 🌿 Waste2Value Intelligence System

An AI-powered Waste Management & Waste-to-Energy (WTE) simulation platform designed for smart city resilience.

## 🚀 Overview
Waste2Value is a full-stack Single Page Application (SPA) that bridges the gap between citizens, collectors, and energy plants. It uses AI to classify waste, coordinates smart collection via a live backend, and simulates the industrial process of converting waste into renewable electricity.

### Key Features
- **AI Classification**: Simulated text/image analysis to identify waste types and energy potential.
- **Role-Based Workflow**: Functional interfaces for Home Owners, Collectors, and Plant Operators with live data synchronization.
- **WTE Simulation**: Interactive 5-step industrial simulation (Waste → Power) with real-time physics and metrics.
- **Multilingual Support**: Real-time translation for English, Hindi, Tamil, and Kannada.
- **System Analytics**: Real-time charts showing energy generation and waste distribution.

---

## 🛠 Tech Stack
- **Frontend**: Vanilla HTML5, CSS3 (Glassmorphism), JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: Lowdb (JSON-based persistence)
- **Charts**: Chart.js
- **Containerization**: Docker

---

## 🏃 Local Setup

### 1. Standard Installation
```bash
# Install dependencies
npm install

# Start the server
npm start
```
The app will be available at `http://localhost:3000`.

### 2. Docker Deployment
```bash
# Build the image
docker build -t waste2value .

# Run the container
docker run -p 3000:3000 waste2value
```

---

## 🌍 Language Support
Select your preferred language from the dropdown in the navigation bar. The UI updates dynamically without page reloads, making it accessible to diverse populations.

---

## 🏆 Hackathon Demo Flow
1. **Home**: View the global sustainability stats.
2. **Analyze**: Describe a waste item (e.g., "plastic bottles") and see the AI classify its energy potential.
3. **Management**: Open two browser tabs.
    - Tab 1 (Home Owner): Click "Request Collection".
    - Tab 2 (Collector): See the request appear live. Click "Mark as Collected".
4. **Plant**: Click "Start Processing" to launch the simulation and generate power!
5. **Dashboard**: Observe the analytics updating based on your processed waste.

---
*Built for sustainability and smart city innovation.*
