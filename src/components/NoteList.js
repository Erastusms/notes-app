import React from 'react';
import PropTypes from 'prop-types';
import NoteItems from './NoteItems';

const NoteList = ({ notes, isActiveNotes }) => {
  return (
    <section className="notes-list">
      {notes.length > 0 ? (
        notes.map((note) => <NoteItems key={note.id} {...note} />)
      ) : (
        <div className="notes-list-empty">
          <p>{isActiveNotes ? 'Catatan' : 'Arsip'} Tidak Ditemukan</p>
        </div>
      )}
    </section>
  );
};

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  isActiveNotes: PropTypes.bool,
};

export default NoteList;
