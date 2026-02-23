"""
Logistic Regression training pipeline for SoulSupport synthetic dataset (4 classes).

Steps:
- Load synthetic_data.csv
- Train/test split (80/20, random_state=42, stratified)
- Feature scaling with StandardScaler (fit on training only; transform train and test)
- Train multinomial Logistic Regression (lbfgs, max_iter=2000, class_weight="balanced")
- Evaluate: accuracy, classification report, confusion matrix, recall for crisis class
- Save artifacts: model.pkl and scaler.pkl using joblib

Academic notes:
- Scaling: Features like PHQ-9 (0–27) and quiz/chat_neg (0–1) operate on different
  numeric scales. Standardizing improves optimization stability and convergence
  for gradient-based solvers, preventing large-scale features from dominating.
- Class imbalance matters: Realistic datasets have many low/moderate cases and fewer
  high/crisis cases. Without adjustments, models can be biased toward majority classes.
- class_weight="balanced" helps rare crisis detection by up-weighting minority classes
  in the loss, improving recall for the rare class.
- Multinomial logistic regression is appropriate for multi-class (low/moderate/high/crisis).
  It models classes jointly rather than one-vs-rest, often yielding better calibrated
  probabilities for multi-class problems.

Run:
  python train_model.py
"""

import os
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from joblib import dump


def load_dataset(csv_path: str) -> pd.DataFrame:
    if not os.path.exists(csv_path):
        raise FileNotFoundError(f"Dataset not found at: {csv_path}")
    df = pd.read_csv(csv_path)
    expected_cols = [
        "phq9", "gad7", "ghq12", "quiz", "mood_avg", "mood_trend", "chat_neg", "label"
    ]
    missing = set(expected_cols) - set(df.columns)
    if missing:
        raise ValueError(f"Dataset missing columns: {missing}")
    return df


def main():
    # Resolve path relative to this script for robustness
    script_dir = os.path.dirname(os.path.abspath(__file__))
    data_path = os.path.join(script_dir, "synthetic_data.csv")

    # 1) Load dataset
    df = load_dataset(data_path)

    # 2) Separate features and labels
    X = df.drop(columns=["label"]).values
    y = df["label"].values.astype(int)

    # 3) Train/Test Split (80/20)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )

    # 4) Feature Scaling
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)  # fit only on training data
    X_test_scaled = scaler.transform(X_test)        # transform test with same scaler

    # 5) Train Logistic Regression (multinomial)
    # Use multinomial with lbfgs, and class_weight='balanced' to address class imbalance.
    # If environment does not accept 'multi_class' due to version, fall back gracefully.
    try:
        model = LogisticRegression(
            multi_class="multinomial",
            solver="lbfgs",
            max_iter=2000,
            class_weight="balanced",
            random_state=42,
        )
    except TypeError:
        model = LogisticRegression(
            solver="lbfgs",
            max_iter=2000,
            class_weight="balanced",
            random_state=42,
        )
    model.fit(X_train_scaled, y_train)

    # 6) Evaluation
    y_pred = model.predict(X_test_scaled)
    acc = accuracy_score(y_test, y_pred)
    print(f"Accuracy: {acc:.4f}")

    print("\nClassification Report:")
    print(classification_report(y_test, y_pred, digits=4))

    print("Confusion Matrix:")
    cm = confusion_matrix(y_test, y_pred)
    print(cm)

    # Specifically print recall for crisis class (label=3)
    # recall = TP / (TP + FN) for the crisis row in confusion matrix
    labels_present = sorted(np.unique(y_test))
    if 3 in labels_present and cm.shape[0] > 3:
        crisis_row_sum = cm[3, :].sum()
        crisis_tp = cm[3, 3]
        crisis_recall = crisis_tp / crisis_row_sum if crisis_row_sum > 0 else 0.0
        print(f"\nRecall (crisis class): {crisis_recall:.4f}")
    else:
        print("\nRecall (crisis class): N/A (no crisis samples in test set)")

    # 7) Save artifacts
    model_path = os.path.join(script_dir, "model.pkl")
    scaler_path = os.path.join(script_dir, "scaler.pkl")
    dump(model, model_path)
    dump(scaler, scaler_path)
    print(f"\nSaved model to: {model_path}")
    print(f"Saved scaler to: {scaler_path}")

    # Demonstrate required API support
    # model.predict and model.predict_proba on a few samples
    sample_probs = model.predict_proba(X_test_scaled[:3])
    sample_preds = model.predict(X_test_scaled[:3])
    print("\nSample predict_proba (first 3 rows):")
    print(np.round(sample_probs, 4))
    print("Sample predict (first 3 rows):")
    print(sample_preds)


if __name__ == "__main__":
    main()

