// routes/results.js
const express = require('express');
const router = express.Router();
const { detectWithFallback, QUESTIONS } = require('../utils/fallback');

router.get('/', async (req, res) => {
  try {
    // xử lý song song tất cả câu hỏi
    const results = await Promise.all(QUESTIONS.map(detectWithFallback));
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
