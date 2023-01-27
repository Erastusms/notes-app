import React from 'react';
import PropTypes from 'prop-types';
import NoteItems from './NoteItems';

const NoteList = ({ notes, isActiveNotes }) => {
  return notes.length > 0 ? (
    <section className="notes-list">
      {notes.map((note) => (
        <NoteItems key={note.id} {...note} />
      ))}
    </section>
  ) : (
    <div className="notes-list-empty">
      <p>{isActiveNotes ? 'Catatan' : 'Arsip'} Tidak Ditemukan</p>
    </div>
  );
};

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  isActiveNotes: PropTypes.bool,
};

export default NoteList;
