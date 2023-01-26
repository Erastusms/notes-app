import React from 'react';
import PropTypes from 'prop-types';
import { showFormattedDate } from '../utils/data';
import { FiTrash } from 'react-icons/fi';
import { MdOutlineArchive, MdOutlineUnarchive } from 'react-icons/md';

const NoteDetail = ({ data, onArchive, onUnArchive, onDelete }) => {
  const { id, title, createdAt, body, archived } = data;

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
          onClick={() => onDelete({ id, archived })}
        >
          <FiTrash />
        </button>
      </div>
    </div>
  );
};

NoteDetail.propTypes = {
  data: PropTypes.object.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnArchive: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NoteDetail;
