require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const Notes = require("./models/Notes");

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();
// this allows react to access the files
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// get all notes

app.get("/api/notes", async (req, res) => {
  try {
    const data = await Notes.find({});
    if (!data) {
      throw new Error("An error occured while fetching notes.");
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured while fetching notes..." });
  }
});

// get note by id

app.get("/api/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;

    const data = await Notes.findById(noteId);
    if (!data) {
      throw new Error("An error occured while fetching notes.");
    }
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occured while fetching notes..." });
  }
});

// create a note

app.post("/api/notes", async (req, res) => {
  try {
    const { title, description } = req.body;

    const data = await Notes.create({ title, description });
    if (!data) {
      throw new Error("An error occured while creating a note.");
    }
    res.status(201).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured while creating a note..." });
  }
});
// update a note

app.put("/api/notes/:id", async (req, res) => {
  try {

    const noteId = req.params.id;

    const { title, description } = req.body;

    const data = await Notes.findByIdAndUpdate(noteId, { title, description });
    if (!data) {
      throw new Error("An error occured while updating a note.");
    }
    res.status(201).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured while updating a note..." });
  }
});
// delete a note

app.delete("/api/notes/:id", async (req, res) => {
  try {

    const noteId = req.params.id;
    
    const data = await Notes.findByIdAndDelete(noteId);
    if (!data) {
      throw new Error("An error occured while deleting a note.");
    }
    res.status(201).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured while deleting a note..." });
  }
});



app.get("/", (req, res) => {
  res.json("Hello Mate!");
});

app.get("*", (req, res) => {
  res.sendStatus("404");
});

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
