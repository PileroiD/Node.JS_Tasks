const chalk = require("chalk");
const Note = require("./models/Note");

async function addNote(title) {
    await Note.create({ title });
    console.log(chalk.green.inverse("Note was added"));
}

async function removeNote(id) {
    await Note.deleteOne({ _id: id });
    console.log(chalk.green.inverse(`Note with id ${id} was deleted`));
}

async function editNote({ id, title }) {
    await Note.updateOne({ _id: id }, { title });
    console.log(chalk.green.inverse("Note was edited"));
}

async function getNotes() {
    const notes = await Note.find();
    return notes;
}

module.exports = {
    addNote,
    removeNote,
    getNotes,
    editNote,
};
