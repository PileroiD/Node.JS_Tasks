const chalk = require("chalk");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const {
    addNote,
    getNotes,
    removeNote,
    editNote,
} = require("./notes.controller.js");

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", async (req, res) => {
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false,
        error: false,
    });
});

app.post("/", async (req, res) => {
    try {
        await addNote(req.body.title);
        res.render("index", {
            title: "Express App",
            notes: await getNotes(),
            created: true,
            error: false,
        });
    } catch (error) {
        res.render("index", {
            title: "Express App",
            notes: await getNotes(),
            created: false,
            error: true,
        });
    }
});

app.delete("/:id", async (req, res) => {
    removeNote(req.params.id);
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false,
        error: false,
    });
});

app.put("/", async (req, res) => {
    editNote(req.body);
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false,
        error: false,
    });
});

const dbPassword = "NakGRIRWTj3UcyUi";

mongoose
    .connect(
        `mongodb+srv://aleksandrlozinskiy2005:${dbPassword}@cluster0.tu9ykk2.mongodb.net/notes?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(() => {
        app.listen(port, () => {
            console.log(
                chalk.green(`Server has been started on port ${port} ...`)
            );
        });
    });
