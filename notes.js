console.log('Starting notes.js');
const fs = require('fs');

let fetchNotes = () => {
  try {
    let notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

let saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

let addNote = (title, body) => {
  let notes = fetchNotes();
  let note = {
    title,
    body
  };
  let duplicateNote = notes.filter((note) => {
    return note.title == title;
  });

  if (duplicateNote.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }


};

let getAll = () => {
  console.log('Getting all notes');
}

let readNote = (title) => {

}

let removeNote = (title) => {
  let notes = fetchNotes();
  let filteredNotes = notes.filter((note) => note.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};

module.exports = {
  addNote,
  getAll,
  readNote,
  removeNote
};

