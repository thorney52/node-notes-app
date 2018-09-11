console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes.js');
const titleOptions = {
    describe: 'Title of the note',
            demand: true,
            alias: 't'
};

const bodyOptions = {
    decribe: 'Body of the note',
    demand: true,
    alias: 'b'
};

const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('remove', 'Remove the specified note', {
        title: titleOptions
    })
    .command('read', 'Read a specific note', {
        title: titleOptions
    })
    .help()
    .argv;


let command = argv._[0];

console.log('Command: ', command);
console.log('Process ', process.argv);
console.log('yargs ', argv);

if (command == 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note created');
        console.log('--');
        console.log(`Title: ${note.title}`);
        console.log(`Body: ${note.body}`);
    }
} else if (command == 'list') {
    let allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    allNotes.forEach((note) => notes.logNote(note));

} else if (command == 'read') {
    notes.readNote(argv.title);

} else if (command == 'remove') {
    let noteRemoved = notes.removeNote(argv.title);
    let message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);

} else {
    console.log('Command not recognized');
}