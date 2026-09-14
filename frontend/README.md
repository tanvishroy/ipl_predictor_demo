# 🏏 IPL Match Winner Predictor — React Frontend

A modern, responsive, and IPL/cricket-themed React frontend for predicting match outcomes using an existing Flask Machine Learning API.

---

## 🚀 Quick Start Guide

### 1. Start Your Existing Flask Backend
Make sure your Flask server is running locally on port `5000`:

```bash
# In your Flask project directory:
python app.py
```

Verify that the backend endpoint is listening at:
`POST http://127.0.0.1:5000/predict`

> **Note on CORS:** Ensure your Flask backend has `flask-cors` enabled so the React app running on `http://localhost:5173` can communicate with it:
> ```python
> from flask_cors import CORS
> CORS(app)
> ```

---

### 2. Start the React Frontend

In this repository directory, install dependencies (if not already installed) and run the development server:

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev
```

Open your browser at **[http://localhost:5173](http://localhost:5173)** to view the application.

---

## 📡 API Contract (Strict Specification)

- **Base URL:** `http://127.0.0.1:5000`
- **Endpoint:** `POST /predict`
- **Headers:** `Content-Type: application/json`

### Sample Request:
```json
{
  "team1": "CSK",
  "team2": "MI"
}
```

### Supported Team Codes:
- `CSK` — Chennai Super Kings
- `RCB` — Royal Challengers Bengaluru
- `MI` — Mumbai Indians
- `RR` — Rajasthan Royals
- `KKR` — Kolkata Knight Riders
- `PBKS` — Punjab Kings
- `SRH` — Sunrisers Hyderabad
- `DC` — Delhi Capitals
- `LSG` — Lucknow Super Giants
- `GT` — Gujarat Titans

### Sample Success Response (HTTP 200):
```json
{
  "winner": "CSK"
}
```

### Sample Error Response:
```json
{
  "error": "Team 1 and Team 2 must be different."
}
```

---

## ✨ Features Built

1. **IPL Stadium Vibe UI:** Dark theme with stadium floodlights, glassmorphism cards, and official franchise color palettes.
2. **Team Selectors:** Accessible dropdowns showing full team names, sending exact team codes to the Flask endpoint.
3. **Smart Validations:** Client-side prevention of same-team selection and empty fields with friendly warning alerts.
4. **Live Backend Indicator:** Auto-pings `http://127.0.0.1:5000` every 10 seconds to indicate live server connectivity status.
5. **Real Winner Display:** Prominently renders the winning team returned from your Flask ML model with trophy animations and team statistics.
6. **Robust Error Handling:** Distinguishes between API validation errors and network connection errors.
7. **Head-to-Head Comparison:** Visual breakdown of titles, captains, and team slogans.
8. **Prediction History:** Local storage log of recent match predictions.
