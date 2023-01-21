import React from 'react';
import PropTypes from 'prop-types';
import { showFormattedDate, deleteNote } from '../utils/data';
import { FiTrash } from 'react-icons/fi';
import { MdOutlineArchive, MdOutlineUnarchive } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function NoteDetail(noteDetail) {
  const { id, title, createdAt, body, archived, onArchive, onUnArchive } =
    noteDetail;

  const navigate = useNavigate();
  const onDelete = (id) => {
    deleteNote(id);
    navigate(archived ? '/archives' : '/');
  };

  return (
    <div>
      <h3 className="detail-page__title">{title}</h3>
      <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
      <div className="detail-page__body">{body}</div>
      <div className="detail-page__action">
        <button
          className="action"
          type="button"
          title={archived ? 'Batal Arsip' : 'Arsipkan'}
          onClick={() => {
            archived ? onUnArchive(id) : onArchive(id);
          }}
        >
          {archived ? <MdOutlineUnarchive /> : <MdOutlineArchive />}
        </button>
        <button
          className="action"
          type="button"
          title="Hapus"
          onClick={() => onDelete(id)}
        >
          <FiTrash />
        </button>
      </div>
    </div>
  );
}

NoteDetail.propTypes = {
  noteDetail: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default NoteDetail;
