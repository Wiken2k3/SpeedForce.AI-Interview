# 🤖 AI Interview Detector

A lightweight backend service that simulates AI-generated vs human-written detection for typical interview questions. Built with Node.js and Express.

---

## 🧠 About

**AI Interview Detector** mimics the behavior of AI detection systems by leveraging three mock models: `ModelA`, `ModelB`, and `ModelC`. Each model is designed with artificial latency and failure probability to simulate real-world inference challenges.

The service processes a fixed set of common interview questions and returns AI vs Human predictions with confidence scores and processing time.

---

## ✅ Features

- 🔁 **Model Fallback Strategy**: ModelA → ModelB → ModelC
- 📊 **Simulated AI Models** with custom delay and failure logic
- 🗣️ **5 Hardcoded Interview Questions**
- ⚡ **API Endpoint**: `GET /results`
- ⏱️ **Time-tracking** per model response
- 🧩 **Structured JSON Output** with confidence scores

---

## 🚀 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js

---

## 📦 Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-detector.git
cd ai-detector
`````
### 2. Install Dependencies

```bash
npm install

`````
### 3. Run the Server
```bash
npm start
`````
The server will be available at:
👉 http://localhost:3000

### 🔎 API Usage
Endpoint: GET /results

Returns simulated AI detection results for five predefined interview questions.

🔸 Sample Request
```bash
GET http://localhost:3000/results
`````
🔸 Sample Response
```bash
[
  {
    "question": "Tell me about yourself",
    "model": "ModelB",
    "confidence": 0.62,
    "result": "AI",
    "timeTaken": 3010
  },
  {
    "question": "Why this company?",
    "model": "ModelA",
    "confidence": 0.81,
    "result": "AI",
    "timeTaken": 1000
  },
  {
    "question": "Greatest weakness?",
    "model": "ModelA",
    "confidence": 0.55,
    "result": "Human",
    "timeTaken": 1000
  },
  {
    "question": "Describe a challenge you solved",
    "model": "ModelA",
    "confidence": 0.56,
    "result": "AI",
    "timeTaken": 1000
  },
  {
    "question": "Where do you see yourself in 5 years?",
    "model": "ModelA",
    "confidence": 0.98,
    "result": "AI",
    "timeTaken": 1000
  }
]
`````
🧪 Testing the API
🔹 Option 1: Using Browser

Visit: http://localhost:3000/results

🔹 Option 2: Using Postman

Method: GET

URL: http://localhost:3000/results

Headers: None

Body: None

## 📦 Project Structure
```bash
ai-detector/
├── models/         # Simulated AI model logic
├── routes/         # API routes
├── utils/          # Fallback and helper functions
├── app.js          # Express app initialization
└── server.js       # Server entry point

`````
