const express = require('express');
const uuid = require('./helpers/uuid');
const path = require('path');
const fs = require('fs');
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');
const util = require('util');

const PORT = process.env.PORT || 3001;
const savedNotes = './db/db.json';
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/api/notes', (req, res) => {
  fs.readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

app.post('/api/notes', (req, res) => {
  const { noteTitle, noteText } = req.body;

  if (!noteTitle || !noteText) {
    res.status(400).json({ error: 'Both noteTitle and noteText are required fields' });
    return;
  }

  const newNote = {
    noteTitle,
    noteText,
    note_id: uuid(),
  };

  const readAndAppend = (newNote, savedNotes) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(newNotes, parsedData);
      }
    });
  };
});


app.listen(PORT, () =>
  console.log(`Listening for requests on port ${PORT}! 🏎️`)
);
