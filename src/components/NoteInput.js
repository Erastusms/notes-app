import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiCheck } from 'react-icons/fi';

const NoteInput = ({ addNote }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const onTitleChange = (event) => setTitle(event.target.value);
  const onBodyChange = (event) => setBody(event.target.innerHTML);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    addNote({ title, body });
  };

  return (
    <section className="add-new-page">
      <div className="add-new-page__input">
        <input
          type="text"
          className="add-new-page__input__title"
          placeholder="Judul Notes"
          onChange={(e) => onTitleChange(e)}
        />
        <div
          className="add-new-page__input__body"
          contentEditable
          data-placeholder="Isi notes"
          onInput={(e) => onBodyChange(e)}
        ></div>
      </div>
      <div className="add-new-page__action">
        <button
          className="action"
          type="button"
          title="Simpan"
          onClick={onSubmitHandler}
        >
          <FiCheck />
        </button>
      </div>
    </section>
  );
};

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;
