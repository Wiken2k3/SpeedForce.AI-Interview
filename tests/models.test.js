const { ModelA, ModelB, ModelC } = require('../models/models');

describe('AI Models', () => {
  test('ModelA returns valid result with ~1s delay', async () => {
    const start = Date.now();
    const res = await ModelA();
    const duration = Date.now() - start;

    expect(res).toHaveProperty('model', 'ModelA');
    expect(res).toHaveProperty('confidence');
    expect(res.confidence).toBeGreaterThanOrEqual(0.5);
    expect(res.confidence).toBeLessThanOrEqual(1);
    expect(res).toHaveProperty('result');
    expect(['Human', 'AI']).toContain(res.result);
    expect(duration).toBeGreaterThanOrEqual(1000);
  });
  // Tương tự cho ModelB, ModelC
});
