import React from 'react';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';
import { Link } from 'react-router-dom';
import { showFormattedDate } from '../utils/data';

const NoteItems = ({ id, title, createdAt, body }) => {
  return (
    <article className="note-item">
      <h3 className="note-item__title">
        <Link to={`/notes-app/note/${id}`}>{title}</Link>
      </h3>
      <p className="note-item__createdAt">{showFormattedDate(createdAt)}</p>
      <p className="note-item__body">{parser(body)}</p>
    </article>
  );
};

NoteItems.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default NoteItems;
