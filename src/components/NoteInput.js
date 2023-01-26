import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiCheck } from 'react-icons/fi';

// ubah jadi functional component besok
// class NoteInput extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       title: '',
//       body: '',
//     };

//     this.onSubmitHandler = this.onSubmitHandler.bind(this);
//   }

//   onTitleChange(event) {
//     this.setState({ title: event.target.value });
//   }
//   onInputHandler(event) {
//     this.setState({ body: event.target.innerHTML });
//   }

//   onSubmitHandler() {
//     console.log(this.state)
//     this.props.addNote(this.state);
//   }

//   render() {
//     return (
//       <section className="add-new-page">
//         <div className="add-new-page__input">
//           <input
//             type="text"
//             className="add-new-page__input__title"
//             placeholder="Judul Notes"
//             value={this.state.title}
//             onChange={(e) => this.onTitleChange(e)}
//           />
//           <div
//             className="add-new-page__input__body"
//             contentEditable
//             data-placeholder="Isi notes"
//             onInput={(e) => this.onInputHandler(e)}
//           ></div>
//         </div>
//         <div className="add-new-page__action">
//           <button
//             className="action"
//             type="button"
//             title="Simpan"
//             onClick={this.onSubmitHandler}
//           >
//             <FiCheck />
//           </button>
//         </div>
//       </section>
//     );
//   }
// }

const NoteInput = ({ addNote }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const onTitleChange = (event) => setTitle(event.target.value);
  const onBodyChange = (event) => setBody(event.target.innerHTML);
  // const onSubmitHandler = () => addNote({ title, body });

  const onSubmitHandler = async (event) => {
    // const notes = { title, body };
    // console.log(notes);
    // console.log(title.title)
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
          // value={title}
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
          // onClick={(e) => onSubmitHandler(e)}
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
