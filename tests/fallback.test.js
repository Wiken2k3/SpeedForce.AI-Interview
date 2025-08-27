const { detectWithFallback } = require('../utils/fallback');

describe('Fallback Logic', () => {
  test('Returns result using fallback sequence', async () => {
    const question = 'Tell me about yourself';
    const res = await detectWithFallback(question);

    expect(res).toHaveProperty('model');
    expect(['ModelA', 'ModelB', 'ModelC']).toContain(res.model);
    expect(res).toHaveProperty('confidence');
    expect(res.confidence).toBeGreaterThanOrEqual(0.5);
    expect(res.confidence).toBeLessThanOrEqual(1.0);
    expect(['Human', 'AI']).toContain(res.result);
    expect(res).toHaveProperty('timeTaken');
    expect(res.timeTaken).toBeGreaterThanOrEqual(0);
  });
});
