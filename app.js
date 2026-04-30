require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());

let notes = [];
let id = 1;

// CREATE
app.post('/notes', (req, res) => {
  const { text } = req.body;

  // Validation
  if (!text || text.trim() === '') {
    return res.status(400).json({ message: 'Text is required' });
  }

  const newNote = {
    id: id++,
    text,
    createdAt: new Date()
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

// READ ALL
app.get('/notes', (req, res) => {
  res.json(notes);
});

// READ ONE
app.get('/notes/:id', (req, res) => {
  const note = notes.find(n => n.id == req.params.id);

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  res.json(note);
});

// UPDATE
app.patch('/notes/:id', (req, res) => {
  const note = notes.find(n => n.id == req.params.id);

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  const { text } = req.body;

  // Validation
  if (!text || text.trim() === '') {
    return res.status(400).json({ message: 'Text is required' });
  }

  note.text = text;
  note.updatedAt = new Date();

  res.json(note);
});

// DELETE
app.delete('/notes/:id', (req, res) => {
  const note = notes.find(n => n.id == req.params.id);

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  notes = notes.filter(n => n.id != req.params.id);

  res.json({ message: 'Note deleted successfully' });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
