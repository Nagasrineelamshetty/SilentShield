# SilentShield – Real-Time IoT Anomaly Detection Dashboard

## Project Overview

SilentShield is an end-to-end IoT monitoring system designed to collect sensor data from hardware devices, detect anomalies using a machine learning model, and visualize the results in real time through an interactive web dashboard.

The system integrates **embedded hardware, machine learning, cloud databases, backend services, and a modern frontend dashboard** to create a complete real-time monitoring solution.

The pipeline begins with sensor data collection using **Arduino**, followed by anomaly detection using a **Python machine learning model**, and finally real-time visualization through **Firebase and a React dashboard**.

---

## System Architecture

Arduino Sensors
↓
Arduino IDE Data Transmission
↓
Python Backend (Live Detection)
↓
Machine Learning Model (Isolation Forest)
↓
Firebase Realtime Database
↓
React Dashboard (Live Charts)

---

## Key Features

• Real-time sensor data collection from Arduino hardware
• Machine learning based anomaly detection using Isolation Forest
• Live data streaming to Firebase Realtime Database
• Interactive dashboard with real-time charts
• Continuous system monitoring and visualization
• Modular architecture combining IoT + ML + Cloud + Web

---

## Technology Stack

### Hardware

* Arduino Microcontroller
* Environmental Sensors

### Machine Learning

* Python
* Scikit-learn
* Isolation Forest Algorithm
* Jupyter Notebook for model development

### Backend

* Python
* Firebase Admin SDK

### Database

* Firebase Realtime Database

### Frontend

* React.js
* Chart.js
* Vite

### Development Tools

* Arduino IDE
* VS Code
* Git & GitHub

---

## Project Workflow

### Step 1 — Hardware Data Collection

Sensor data is collected using Arduino hardware and transmitted through serial communication.

The Arduino code runs through **Arduino IDE** and continuously sends sensor readings.

---

### Step 2 — Model Training

The anomaly detection model is developed in:

```
SilentShield.ipynb
```

The dataset is used to train an **Isolation Forest model**, which identifies abnormal sensor patterns.

The trained model is exported as:

```
isolation_forest_model.pkl
```

---

### Step 3 — Backend Processing

The Python backend script:

```
live_detection.py
```

performs the following tasks:

* Reads incoming sensor data
* Loads the trained ML model
* Detects anomalies in real time
* Sends processed data to Firebase

---

### Step 4 — Firebase Integration

The backend pushes the processed sensor data to:

**Firebase Realtime Database**

Firebase acts as the **real-time communication layer between backend and frontend**.

---

### Step 5 — Frontend Dashboard

The React dashboard located in:

```
silentshieldfrontend/silent-shield-dashboard
```

connects to Firebase and displays:

* Live sensor readings
* Anomaly detection results
* Interactive charts

The dashboard updates automatically whenever new data arrives in Firebase.

---

## Project Folder Structure

```
AnomalyDetection
│
├── silentshieldbackend
│   ├── isolation_forest_model.pkl
│   ├── live_detection.py
│   ├── SilentShield.ipynb
│   ├── firebase credentials (ignored)
│
├── silentshieldfrontend
│   └── silent-shield-dashboard
│       ├── src
│       ├── public
│       ├── App.jsx
│       ├── firebase.js
│
└── README.md
```

---

## How to Run the Project

### 1️⃣ Run Arduino Code

Upload the Arduino sensor code using **Arduino IDE**.

Ensure the board starts sending sensor data through the serial port.

---

### 2️⃣ Run the Machine Learning Backend

Navigate to the backend folder:

```
cd silentshieldbackend
```

Install dependencies:

```
pip install -r requirements.txt
```

Run the live detection script:

```
python live_detection.py
```

This script loads the trained model and pushes real-time anomaly detection results to Firebase.

---

### 3️⃣ Start the Frontend Dashboard

Navigate to the frontend folder:

```
cd silentshieldfrontend/silent-shield-dashboard
```

Install dependencies:

```
npm install
```

Run the dashboard:

```
npm run dev
```

The dashboard will start and display **real-time sensor data and anomaly detection results**.


---

## Developed By

**Nagasri Neelamshetty**


---


