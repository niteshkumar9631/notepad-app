import React, { useState } from "react";
import { Plus, StickyNote } from "lucide-react";
import NotesCard from "./components/NotesCard";
import { motion } from "framer-motion";

const App = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: "Subscribe" },
    { id: 2, title: "Note App" },
  ]);
  const [text, setText] = useState("");
  const [isToggle, setIsToggle] = useState(false);

  const addNote = () => {
    if (text.length === 0) {
      setText("Please Write Something");
      return;
    }
    setNotes((prev) => [
      ...prev,
      { id: new Date().toLocaleString(), title: text },
    ]);
    setText("");
    setIsToggle(false);
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <div className="min-h-screen h-auto flex flex-col bg-gray-900 text-white overflow-x-hidden p-8">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-5xl font-bold flex items-center gap-2 text-purple-400 drop-shadow-lg">
          <StickyNote size={40} className="text-yellow-400" /> NOTE
        </h1>
        <p className="font-semibold text-gray-400 text-lg text-center">
          Write your thought & Download it
        </p>
      </div>
      
      {/* Add Note Button */}
      <motion.div
        className="flex flex-col items-center gap-2 mt-12 w-full bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg p-8 shadow-lg cursor-pointer hover:scale-102 transition-all duration-300 ease-in-out"
        onClick={() => setIsToggle(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus size={60} />
        <h1 className="text-2xl text-white font-bold">Add Note</h1>
      </motion.div>

      {/* Add Note Modal */}
      {isToggle && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-purple-500 md:h-1/2 md:w-2/7 bg-gray-900 rounded-lg flex flex-col items-center gap-2 p-8">
          <h1 className="md:text-3xl text-xl font-semibold">Write Your Notes..</h1>
          <textarea
            name="note"
            id="note"
            onChange={(e) => setText(e.target.value)}
            value={text}
            className="tex-white bg-gray-700 rounded-lg w-full h-full"
          ></textarea>
          <div className="flex gap-2">
            <button
              className="bg-purple-600 px-6 py-2 rounded-lg mt-4"
              onClick={addNote}
            >
              Add
            </button>
            <button
              className="bg-purple-600 px-6 py-2 rounded-lg mt-4"
              onClick={() => setIsToggle(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Display Notes */}
      {notes.length > 0 ? (
        <div className="flex flex-wrap justify-center items-center gap-4 mt-10">
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <NotesCard
                id={note.id}
                note={note.title}
                key={note.id}
                deleteNote={deleteNote}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        "No Notes Yet"
      )}
    </div>
  );
};

export default App;
