/**
 * Sentiment analysis utility for SoulSupport
 * Extracts a negativity score (0-1) from chat messages
 */

const NEGATIVE_WORDS = [
  "sad", "depressed", "anxious", "tired", "hopeless", "worthless", "failure",
  "angry", "hate", "lonely", "exhausted", "stressed", "overwhelmed", "pain",
  "hurt", "cry", "miserable", "terrible", "bad", "worst", "unhappy", "fear",
  "worried", "scared", "die", "suicide", "end", "kill", "harm", "useless"
];

const CRISIS_KEYWORDS = ["die", "suicide", "kill", "harm", "end it", "overdose"];

export function calculateNegativityScore(message: string): number {
  const words = message.toLowerCase().split(/\W+/);
  if (words.length === 0) return 0;

  let negativeMatchCount = 0;
  
  // Basic count of negative words
  words.forEach(word => {
    if (NEGATIVE_WORDS.includes(word)) {
      negativeMatchCount++;
    }
  });

  // Boost score if crisis keywords are present
  let crisisBoost = 0;
  CRISIS_KEYWORDS.forEach(keyword => {
    if (message.toLowerCase().includes(keyword)) {
      crisisBoost += 0.4;
    }
  });

  // Simple normalization: (matches / length) + boost, capped at 1.0
  // Weighting the negative words against total words, but with a minimum floor if matches exist
  const baseScore = negativeMatchCount > 0 ? Math.min(0.5, negativeMatchCount / 5) : 0;
  const totalScore = baseScore + crisisBoost;

  return Math.min(1.0, totalScore);
}

export function containsCrisisKeywords(message: string): boolean {
  return CRISIS_KEYWORDS.some(keyword => message.toLowerCase().includes(keyword));
}
