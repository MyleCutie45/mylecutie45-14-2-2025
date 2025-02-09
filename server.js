// server.js - Node.js backend
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const MOOD_FILE = path.join(__dirname, 'moods.json');

// Load moods from file
const loadMoods = () => {
    if (!fs.existsSync(MOOD_FILE)) return [];
    return JSON.parse(fs.readFileSync(MOOD_FILE));
};

// Save moods to file
const saveMoods = (moods) => {
    fs.writeFileSync(MOOD_FILE, JSON.stringify(moods, null, 2));
};

// Get moods
app.get('/moods', (req, res) => {
    res.json(loadMoods());
});

// Post new mood
app.post('/moods', (req, res) => {
    const moods = loadMoods();
    const newMood = { mood: req.body.mood, date: new Date().toISOString() };
    moods.push(newMood);
    saveMoods(moods);
    res.json(newMood);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));