import React from 'react';
import PropTypes from 'prop-types';
import NoteItems from './NoteItems';

function NoteList({ notes }) {
  return (
    <section className="notes-list">
      {notes.map((note) => (
        <NoteItems
          {...note}
        />
      ))}
    </section>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NoteList;
