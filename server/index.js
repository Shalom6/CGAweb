const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { event, about, pillars, contact, artists, social, welcome, coreValues } = require('./data/content');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'Canadian Gospel Artistes API' });
});

app.get('/api/site', (_req, res) => {
  res.json({ event, about, pillars, contact, artists, social, welcome, coreValues });
});

app.get('/api/event', (_req, res) => {
  res.json(event);
});

app.get('/api/artists', (_req, res) => {
  res.json({ count: artists.length, artists });
});

const clientDist = path.join(__dirname, '../client/dist');

if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`CGA server listening on http://localhost:${PORT}`);
});
