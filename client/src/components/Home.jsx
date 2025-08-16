// import { set } from 'mongoose';
import axios from "axios";
import React, { useEffect , useState } from 'react'

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

const fetchNotes = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api');
    setNotes(res.data);
  } catch (error) {
    console.error(error);
  }
};

const addNote = async (note) => {
  const value = (note ?? "").trim();
  if (!value) return; // don't send empty note
  try {
    const res = await axios.post('http://localhost:5000/api/items', { note: value });
    // server returns { message, item }
    if (res.data?.item) {
      setNotes([...notes, res.data.item]);
    }
    setNewNote("");
  } catch (error) {
    if (error.response) {
      console.error('Add note error:', error.response.status, error.response.data);
    } else {
      console.error(error);
    }
  }
};

const deleteNote = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/items/${id}`);
    setNotes(notes.filter((note) => note._id !== id));
  } catch (error) {
    if (error.response) {
      console.error('Delete note error:', error.response.status, error.response.data);
    } else {
      console.error(error);
    }
  }
};


useEffect(() => {
  fetchNotes();
}, []);

return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="w-full md:w-1/2">
          <input 
            type="text" 
            placeholder="add" 
            value={newNote}
            onChange={(e)=> setNewNote(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="w-full md:w-1/2">
          <button className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors " onClick={() => addNote(newNote)}>Add</button>
        </div>
      </div>

      <h1 className="text-2xl font-bold mt-6 mb-4">Notes</h1>
      <div className="space-y-2">
        {notes.map((note) => (
          <div
            key={note._id || note.id} // depends on backend
            className="p-3 bg-slate-300 rounded-md"
          >
            {note.note}
            <button 
              className="ml-4 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              onClick={() => deleteNote(note._id || note.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home