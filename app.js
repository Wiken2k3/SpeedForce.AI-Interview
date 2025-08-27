const express = require('express');
const app = express();

const resultsRouter = require('./routes/results');
const detectRouter = require('./routes/detect');

app.use(express.static('public'));
app.use(express.json()); // 👈 Xử lý JSON cho POST

app.use('/results', resultsRouter);
app.use('/detect', detectRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
