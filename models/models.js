// models/models.js

/**
 * Simulate an async model call.
 * @param {string} modelName
 * @param {number} delay ms delay
 * @param {number} successRate probability 0..1
 * @returns {Promise<{model: string, confidence: number, result: string}>}
 */
function callModel(modelName, delay, successRate) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > successRate) {
        reject(new Error(`${modelName} failed`));
        return;
      }

      const confidence = +(0.5 + Math.random() * 0.5).toFixed(2); // 0.5 to 1.0
      const result = Math.random() > 0.5 ? 'Human' : 'AI';

      resolve({ model: modelName, confidence, result });
    }, delay);
  });
}

const ModelA = () => callModel('ModelA', 1000, 0.9);
const ModelB = () => callModel('ModelB', 2000, 0.7);
const ModelC = () => callModel('ModelC', 3000, 0.95);

module.exports = { ModelA, ModelB, ModelC };
