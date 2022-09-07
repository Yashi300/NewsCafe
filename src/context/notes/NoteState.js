import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) =>{
  const host="https://newscafebackend.herokuapp.com/"
  const notesInitial =[]
  const userInitial =[]
  const [notes, setNotes] = useState(notesInitial)
  const [user, setUser] = useState(userInitial)

  //GET A User
  const getUser =async ()=>{
    console.log("getting user");
    //API Call
    const response = await fetch(`https://newscafebackend.herokuapp.com/api/auth/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token" : localStorage.getItem('token')
      }
    });
    const json = await response.json()
    console.log(json);
    setUser(json)
  }
  //GET A NOTE
  const getNotes =async ()=>{
    console.log("getting notes");
    //API Call
    const response = await fetch(`https://newscafebackend.herokuapp.com/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token" : localStorage.getItem('token')
      }
    });
    const json = await response.json()
    setNotes(json)
  }
  
  //ADD A NOTE
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`https://newscafebackend.herokuapp.com/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
     const note = await response.json();
     setNotes(notes.concat(note))
    
  }

  // Dele

  //DELETE A NOTE
  const deleteNote =async (id)=>{
     //API call
     const response = await fetch(`https://newscafebackend.herokuapp.com/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token" : localStorage.getItem('token')
      },
    });
    const json =await response.json();
   const newNotes=notes.filter((note)=>{return note._id!==id})
   setNotes(newNotes);
  }
  //EDIT A NOTE
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`https://newscafebackend.herokuapp.com/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();

     let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  }

    return (
      <NoteContext.Provider value={{notes, user, addNote, deleteNote, editNote, getNotes, getUser}}>
        {props.children}
      </NoteContext.Provider>
    )
}

export default NoteState;