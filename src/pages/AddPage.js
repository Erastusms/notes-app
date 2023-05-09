import React from 'react';
import NoteInput from '../components/NoteInput';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/data';

const AddPage = () => {
  const navigate = useNavigate();

  const onAddNoteHandler = (notes) => {
    addNote(notes);
    navigate('/notes-app');
  };

  return <NoteInput addNote={onAddNoteHandler} />;
};

export default AddPage;
