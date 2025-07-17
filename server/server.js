require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connexion à MongoDB réussie"))
  .catch(err => console.error("❌ Erreur MongoDB :", err));

app.get('/api', (req, res) => {
  res.send('Hello from Express 👋');
});

const PORT = process.env.PORT || 5000;
const path = require('path');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT}`));
