import React from 'react';
import NoteInput from '../components/NoteInput';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/data';

function AddPage() {
  const navigate = useNavigate();

  function onAddNoteHandler(notes) {
    addNote(notes);
    navigate('/');
  }

  return (
    <NoteInput addNote={onAddNoteHandler} />
  )
}

export default AddPage