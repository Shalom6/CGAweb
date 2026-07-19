const express = require('express');
const cors = require('cors');
const path = require('path');
const { event, artists } = require('./data/content');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const rsvps = [];

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'Canadian Gospel Artistes API' });
});

app.get('/api/event', (_req, res) => {
  res.json(event);
});

app.get('/api/artists', (_req, res) => {
  res.json({ count: artists.length, artists });
});

app.post('/api/rsvp', (req, res) => {
  const { name, email } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  const entry = {
    id: rsvps.length + 1,
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    createdAt: new Date().toISOString(),
  };

  rsvps.push(entry);
  res.status(201).json({ message: 'You are on the list. See you in Saskatoon.', entry });
});

const fs = require('fs');
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
