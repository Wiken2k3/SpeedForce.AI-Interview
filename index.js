// index.js
// Simple AI detection simulator with fallback (ModelA -> ModelB -> ModelC)
// Single-file, Express-based, returns results for 5 hardcoded questions.

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Simulate an async model call.
 * - modelName: string
 * - delay: milliseconds number
 * - successRate: 0..1 probability of success
 *
 * Resolves with { model, confidence, result } or rejects on failure.
 */
function callModel(modelName, delay, successRate) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Fail when random > successRate
      if (Math.random() > successRate) {
        reject(new Error(`${modelName} failed`));
        return;
      }

      // Build result
      const confidence = +(0.5 + Math.random() * 0.5).toFixed(2); // 0.50 - 1.00
      const result = Math.random() > 0.5 ? 'Human' : 'AI';

      resolve({
        model: modelName,
        confidence,
        result,
      });
    }, delay);
  });
}

// Model functions as required
const MODEL_A = () => callModel('ModelA', 1000, 0.9);  // 1s, 90%
const MODEL_B = () => callModel('ModelB', 2000, 0.7);  // 2s, 70%
const MODEL_C = () => callModel('ModelC', 3000, 0.95); // 3s, 95%

// Hardcoded questions (exactly the 5 requested)
const QUESTIONS = [
  'Tell me about yourself',
  'Why this company?',
  'Greatest weakness?',
  'Describe a challenge you solved',
  'Where do you see yourself in 5 years?',
];

/**
 * Try Model A, then B, then C (fallback).
 * Returns object: { question, model, confidence, result, timeTaken }
 * Throws if all models fail.
 */
async function detectWithFallback(question) {
  const start = Date.now();

  try {
    const resA = await MODEL_A();
    return { question, ...resA, timeTaken: Date.now() - start };
  } catch (_) {
    // swallow and try next
  }

  try {
    const resB = await MODEL_B();
    return { question, ...resB, timeTaken: Date.now() - start };
  } catch (_) {
    // swallow and try next
  }

  try {
    const resC = await MODEL_C();
    return { question, ...resC, timeTaken: Date.now() - start };
  } catch (_) {
    // all failed
  }

  throw new Error(`All models failed for question: "${question}"`);
}

// GET /results -> returns array of results for all 5 questions
app.get('/results', async (req, res) => {
  try {
    // Run detection for all questions (in parallel)
    const results = await Promise.all(QUESTIONS.map(detectWithFallback));
    res.json(results);
  } catch (err) {
    // If any detectWithFallback throws, respond with 500 and error message
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`AI detector service listening at http://localhost:${PORT}`);
});
