const express = require("express");
const Router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');

//ROUTE 1 : GET ALL THE NOTES USING  POST:/api/auth/fetchallnotes
Router.get('/fetchallnotes',fetchuser ,async (req, res)=>{
    try {
        const notes =await Notes.find({user : req.user.id}) 
    res.json(notes);

    }  catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})
   

//ROUTE 2 : ADD A NEW NOTES USING  POST:/api/auth/addnote
Router.post('/addnote',fetchuser,[
    body('title','Enter a valid title').isLength({ min: 3 }),
    body('tag','Enter a valid tag').isLength({ min: 3 }),
    body('description','description must have alteast 5 characters').isLength({ min: 5 })
],async (req, res)=>{
 try {
    const {title, description, tag } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const note = new Notes ({
        title, description, tag, user: req.user.id
    }) 

    const savedNote = await note.save();
    res.json(savedNote);
 }  catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured")
  } 
})

//ROUTE 3 : UPDATE EXSISTING NOTES USING  PUT:/api/auth/updatenote
Router.put('/updatenote/:id',fetchuser,async (req, res)=>{
    const {title, description, tag } = req.body;

    try {
       //Create a newNote object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //Find the note to be updated and update it
    let note =await Notes.findById(req.params.id)
    if(!note){return res.status(404).send("Not Found")}

    if(note.user.toString() !== req.user.id)
    {return res.status(401).send("Not Allowed")};

    note =await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
    res.json({note}); 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
      } 
})

//ROUTE 4 : DELETE EXSISTING NOTES USING  DELETE:/api/auth/deletenote
Router.delete('/deletenote/:id',fetchuser,async (req, res)=>{
    const {title, description, tag } = req.body;

    try {
         //Find the note to be deleted and delete it
    let note =await Notes.findById(req.params.id)
    if(!note){return res.status(404).send("Not Found")}

    //Allow the deletion only if the user owns the note
    if(note.user.toString() !== req.user.id)
    {return res.status(401).send("Not Allowed")};

    note =await Notes.findByIdAndDelete(req.params.id)
    res.json({"success" : "Note has been successfully deleted", note : note});
    }  catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
      } 
})
module.exports = Router