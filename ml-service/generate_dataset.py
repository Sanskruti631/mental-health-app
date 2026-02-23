"""
Synthetic dataset generator for SoulSupport mental health AI.

Why synthetic data:
- Real patient data is not available due to privacy and ethical constraints.
- Synthetic data enables prototyping, feature engineering, and academic evaluation
  without handling sensitive information.

Realism choices:
- Class imbalance approximates real-world distributions where most individuals
  are low risk, fewer are moderate, fewer still are high, and crisis cases are rare.
  Here: 55% low, 25% moderate, 15% high, 5% crisis.
- Clinical screening scores (PHQ-9, GAD-7, GHQ-12) often exhibit bell-shaped
  distributions within cohorts; normal distributions provide a reasonable
  approximation around typical severity means per group.

Output:
- Generates 5000 samples with features and a multi-class label (0=low, 1=moderate, 2=high, 3=crisis)
- Saves to synthetic_data.csv
- Prints class distribution

Run:
  python generate_dataset.py
"""

import numpy as np
import pandas as pd

np.random.seed(42)

N_TOTAL = 5000
# Exact counts to avoid rounding drift:
CLASS_SPLIT = {
    0: 2750,  # low (55%)
    1: 1250,  # moderate (25%)
    2:  750,  # high (15%)
    3:  250,  # crisis (5%)
}

# Ranges for clipping
RANGES = {
    "phq9": (0, 27),
    "gad7": (0, 21),
    "ghq12": (0, 12),
    "quiz": (0.0, 1.0),
    "mood_avg": (1.0, 5.0),
    "chat_neg": (0.0, 1.0),
}

# Group-specific distributions, matching the requirement
GROUP_CONFIG = {
    0: {  # LOW
        "phq9_mean": 5, "phq9_std": 3,
        "gad7_mean": 4, "gad7_std": 3,
        "ghq12_mean": 3, "ghq12_std": 2,
        "quiz_min": 0.0, "quiz_max": 0.4,
        "mood_min": 3.5, "mood_max": 5.0,
        "chat_min": 0.0, "chat_max": 0.3,
    },
    1: {  # MODERATE
        "phq9_mean": 12, "phq9_std": 4,
        "gad7_mean": 10, "gad7_std": 4,
        "ghq12_mean": 6, "ghq12_std": 3,
        "quiz_min": 0.3, "quiz_max": 0.7,
        "mood_min": 2.5, "mood_max": 3.5,
        "chat_min": 0.3, "chat_max": 0.6,
    },
    2: {  # HIGH
        "phq9_mean": 20, "phq9_std": 4,
        "gad7_mean": 17, "gad7_std": 3,
        "ghq12_mean": 9, "ghq12_std": 2,
        "quiz_min": 0.6, "quiz_max": 1.0,
        "mood_min": 1.0, "mood_max": 2.5,
        "chat_min": 0.6, "chat_max": 1.0,
    },
    3: {  # CRISIS (rare, severe distress)
        # Crisis is rare in population-level datasets; most users are not in acute crisis.
        # We model crisis with very high clinical scores, high negative sentiment,
        # low mood averages, and predominantly declining mood trend.
        "phq9_mean": 24, "phq9_std": 2,
        "gad7_mean": 19, "gad7_std": 2,
        "ghq12_mean": 11, "ghq12_std": 1,
        "quiz_min": 0.85, "quiz_max": 1.0,
        "mood_min": 1.0, "mood_max": 1.8,
        "chat_min": 0.8, "chat_max": 1.0,
    },
}

def clip_int(arr: np.ndarray, lo: int, hi: int) -> np.ndarray:
    return np.clip(np.round(arr).astype(int), lo, hi)

def clip_float(arr: np.ndarray, lo: float, hi: float, decimals: int = 3) -> np.ndarray:
    return np.clip(np.round(arr, decimals), lo, hi)

def sample_group(n: int, label: int) -> pd.DataFrame:
    cfg = GROUP_CONFIG[label]

    # Normal-distributed clinical scores (rounded to valid integer ranges)
    phq9 = clip_int(
        np.random.normal(cfg["phq9_mean"], cfg["phq9_std"], size=n),
        RANGES["phq9"][0], RANGES["phq9"][1]
    )
    gad7 = clip_int(
        np.random.normal(cfg["gad7_mean"], cfg["gad7_std"], size=n),
        RANGES["gad7"][0], RANGES["gad7"][1]
    )
    ghq12 = clip_int(
        np.random.normal(cfg["ghq12_mean"], cfg["ghq12_std"], size=n),
        RANGES["ghq12"][0], RANGES["ghq12"][1]
    )

    # Uniform-distributed behavioral signals within group ranges
    quiz = clip_float(
        np.random.uniform(cfg["quiz_min"], cfg["quiz_max"], size=n),
        RANGES["quiz"][0], RANGES["quiz"][1]
    )
    mood_avg = clip_float(
        np.random.uniform(cfg["mood_min"], cfg["mood_max"], size=n),
        RANGES["mood_avg"][0], RANGES["mood_avg"][1], decimals=2
    )
    chat_neg = clip_float(
        np.random.uniform(cfg["chat_min"], cfg["chat_max"], size=n),
        RANGES["chat_neg"][0], RANGES["chat_neg"][1]
    )

    # Mood trend: -1 (declining), 0 (stable), 1 (improving)
    if label == 3:
        # Crisis: mostly declining trend
        mood_trend = np.random.choice([-1, 0, 1], size=n, replace=True, p=[0.8, 0.15, 0.05])
    else:
        # Other groups: uniform random
        mood_trend = np.random.choice([-1, 0, 1], size=n, replace=True)

    return pd.DataFrame({
        "phq9": phq9,
        "gad7": gad7,
        "ghq12": ghq12,
        "quiz": quiz,
        "mood_avg": mood_avg,
        "mood_trend": mood_trend.astype(int),
        "chat_neg": chat_neg,
        "label": np.full(n, label, dtype=int),
    })

def main():
    parts = []
    for label, count in CLASS_SPLIT.items():
        parts.append(sample_group(count, label))

    df = pd.concat(parts, axis=0).sample(frac=1.0, random_state=42).reset_index(drop=True)
    df.to_csv("synthetic_data.csv", index=False)

    # Print class distribution
    counts = df["label"].value_counts().sort_index()
    perc = (counts / len(df) * 100).round(2)
    print("Class distribution:")
    for label in [0, 1, 2, 3]:
        print(f"  label={label}: {counts.get(label, 0)} samples ({perc.get(label, 0.0)}%)")

if __name__ == "__main__":
    main()
