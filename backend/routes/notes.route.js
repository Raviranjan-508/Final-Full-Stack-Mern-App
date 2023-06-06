const {Router} = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { NoteModel } = require("../models/notes.model");
require('dotenv').config()


const notesController = Router();

notesController.get("/", async (req,res) => {
    const notes = await NoteModel.find({userId : req.body.userId})
    res.send(notes)
});

notesController.post("/create", async(req,res) => {
    const {Heading , Note , Tag , userId}= req.body;
    const note = new NoteModel({
        Heading,
        Note,
        Tag,
        userId
    })
    try {
        await note.save()
        res.send("note created")
    } catch (error) {
        res.send("Something went wrong")
    }
})

notesController.delete("/delete/:noteId", async (req,res) => {
    const {noteId} = req.params;
    const deleteNote = await NoteModel.findByOneAndDelete({_id : noteId , userId : req.body.userId})
    if(deleteNote){
        res.send("Deleted")
    }
    else{
        res.send("Couldn't deleted")
    }
})

notesController.patch("/edit/:noteId", async (req,res) => {
    const {noteId} = req.params;
    const updateNote = await NoteModel.findOneAndUpdate({_id : noteId , userId : req.body.userId}, {...req.body})
    if(updateNote){
        res.send("updated")
    }
    else{
        res.send("Couldn't updated")
    }
})

module.exports = {
    notesController
}