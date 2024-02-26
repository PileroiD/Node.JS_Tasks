const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
const _ = require("lodash");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
    const notes = await getNotes();

    const note = {
        id: Date.now().toString(),
        title,
    };

    notes.push(note);

    await fs.writeFile(notesPath, JSON.stringify(notes));
    console.log(chalk.green.inverse("Note was added"));
}

async function removeNote(id) {
    const oldNotes = await getNotes();
    const newNotes = oldNotes.filter((note) => note.id !== id);

    if (!_.isEqual(oldNotes, newNotes)) {
        await fs.writeFile(notesPath, JSON.stringify(newNotes));
        console.log(chalk.green.inverse(`Note with id ${id} was deleted`));
    } else {
        console.log(chalk.red.inverse(`Note with id ${id} wasn't found`));
    }
}

async function printNotes() {
    const notes = await getNotes();

    console.log(chalk.bgBlueBright("Here is the list of notes"));
    notes.forEach((note) => {
        console.log(chalk.blueBright(`id: ${note.id}  title:${note.title}`));
    });
}

async function editNote({ id, title }) {
    const notes = await getNotes();
    notes.map((note) => {
        if (note.id === id) {
            note.title = title;
            return note;
        }
        return note;
    });

    await fs.writeFile(notesPath, JSON.stringify(notes));
    console.log(chalk.green.inverse("Note was edited"));
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

module.exports = {
    addNote,
    removeNote,
    printNotes,
    getNotes,
    editNote,
};
