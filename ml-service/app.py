"""
FastAPI inference server for SoulSupport Logistic Regression model.

This service:
- Loads the trained scikit-learn model (model.pkl) and scaler (scaler.pkl)
- Exposes POST /predict accepting the feature payload
- Returns risk label, confidence (highest class probability), and full probabilities

Notes:
- Scaling must match training: we apply the same StandardScaler used during model
  training to ensure feature distributions align; otherwise predictions are invalid.
- Probability output matters: predict_proba provides per-class probabilities, enabling
  transparency, risk-aware downstream logic, and more informative decision-making.
  Confidence is the maximum probability for the predicted class.
"""

from typing import Dict
import os
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from joblib import load


app = FastAPI(title="SoulSupport Inference API", version="1.0.0")


class Features(BaseModel):
    phq9: float
    gad7: float
    ghq12: float
    quiz: float
    mood_avg: float
    mood_trend: float
    chat_neg: float


# Model and scaler loading
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(SCRIPT_DIR, "model.pkl")
SCALER_PATH = os.path.join(SCRIPT_DIR, "scaler.pkl")

try:
    model = load(MODEL_PATH)
except Exception as e:
    raise RuntimeError(f"Failed to load model from {MODEL_PATH}: {e}")

try:
    scaler = load(SCALER_PATH)
except Exception as e:
    raise RuntimeError(f"Failed to load scaler from {SCALER_PATH}: {e}")


LABELS = ["low", "moderate", "high", "crisis"]


@app.post("/predict")
def predict(features: Features):
    try:
        # Convert input to numpy array in the same order used during training
        x = np.array([[
            features.phq9,
            features.gad7,
            features.ghq12,
            features.quiz,
            features.mood_avg,
            features.mood_trend,
            features.chat_neg,
        ]], dtype=float)

        # Apply the same scaler as training to prevent distribution mismatch
        x_scaled = scaler.transform(x)

        # Predict class and probabilities
        y_pred = model.predict(x_scaled)
        probs = model.predict_proba(x_scaled)

        label_int = int(y_pred[0])
        label_str = LABELS[label_int] if 0 <= label_int < len(LABELS) else "unknown"
        confidence = float(np.max(probs[0]))

        # Map probabilities to label names for transparency
        prob_map = {LABELS[i]: float(probs[0][i]) for i in range(min(len(LABELS), probs.shape[1]))}

        return {"risk": label_str, "confidence": confidence, "probabilities": prob_map}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Inference error: {e}")
