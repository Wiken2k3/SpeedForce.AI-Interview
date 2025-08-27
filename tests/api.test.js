const request = require('supertest');
const app = require('../app');

describe('GET /results', () => {
  test('Returns array of 5 results', async () => {
    const res = await request(app).get('/results');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(5);

    for (const result of res.body) {
      expect(result).toHaveProperty('question');
      expect(result).toHaveProperty('model');
      expect(['ModelA', 'ModelB', 'ModelC']).toContain(result.model);
      expect(result).toHaveProperty('confidence');
      expect(result.confidence).toBeGreaterThanOrEqual(0.5);
      expect(result.confidence).toBeLessThanOrEqual(1.0);
      expect(result).toHaveProperty('result');
      expect(['Human', 'AI']).toContain(result.result);
      expect(result).toHaveProperty('timeTaken');
    }
  });
});
