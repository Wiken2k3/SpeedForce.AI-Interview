// utils/fallback.js
const { ModelA, ModelB, ModelC } = require('../models/models');

const QUESTIONS = [
  'Tell me about yourself',
  'Why this company?',
  'Greatest weakness?',
  'Describe a challenge you solved',
  'Where do you see yourself in 5 years?',
];

/**
 * Try Model A, then B, then C (fallback).
 * Returns detection result with timing.
 * Throws error if all fail.
 */
async function detectWithFallback(question) {
  const start = Date.now();

  try {
    const resA = await ModelA();
    return { question, ...resA, timeTaken: Date.now() - start };
  } catch (_) {}

  try {
    const resB = await ModelB();
    return { question, ...resB, timeTaken: Date.now() - start };
  } catch (_) {}

  try {
    const resC = await ModelC();
    return { question, ...resC, timeTaken: Date.now() - start };
  } catch (_) {}

  throw new Error(`All models failed for question: "${question}"`);
}

module.exports = { detectWithFallback, QUESTIONS };
