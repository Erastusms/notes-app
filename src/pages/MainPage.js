import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
// import { getAllNotes, getActiveNotes, getArchivedNotes } from '../utils/data-dummy';
import { getActiveNotes, getArchivedNotes } from '../utils/data';
import { FiPlus } from 'react-icons/fi';
import Loading from '../components/Loading';

// function MainPageWrapper({ pages }) {
//   const navigate = useNavigate();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const keyword = searchParams.get('keyword');
//   const changeSearchParams = (keyword) => {
//     setSearchParams({ keyword });
//   };

//   const homeNavigate = () => {
//     navigate('/notes/new');
//   };

//   return (
//     <MainPage
//       defaultKeyword={keyword}
//       keywordChange={changeSearchParams}
//       pages={pages}
//       navigateTo={homeNavigate}
//     />
//   );
// }

// class MainPage extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       notes: getAllNotes(),
//       keyword: props.defaultKeyword || '',
//     };

//     this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
//   }

//   onKeywordChangeHandler(keyword) {
//     this.setState(() => {
//       return {
//         keyword,
//       };
//     });

//     this.props.keywordChange(keyword);
//   }

//   render() {
//     const pages = this.props.pages;
//     const noteList = isActiveNotes ? getActiveNotes() : getArchivedNotes();
//     const notes = noteList.filter((note) => {
//       return note.title
//         .toLowerCase()
//         .includes(this.state.keyword.toLowerCase());
//     });
//     return (
//       <section>
//         <h2>Catatan {isActiveNotes ? 'Aktif' : 'Arsip'}</h2>
//         <SearchBar
//           keyword={this.props.keyword}
//           keywordChange={this.onKeywordChangeHandler}
//         />
//         {notes.length > 0 ? (
//           <NoteList notes={notes} />
//         ) : (
//           <div className="notes-list-empty">
//             <p>{isActiveNotes ? 'Catatan' : 'Arsip'} Tidak Ditemukan</p>
//           </div>
//         )}
//         {isActiveNotes && (
//           <div className="homepage__action">
//             <button
//               className="action"
//               type="button"
//               title="Tambah"
//               onClick={() => this.props.navigateTo()}
//             >
//               <FiPlus />
//             </button>
//           </div>
//         )}
//       </section>
//     );
//   }
// }

// const MainPage = ({ pages }) => {
const MainPage = ({ isActiveNotes }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get('keyword') || '';
  });
  const [notes, setNotes] = useState([]);
  // const [notes, setNotes] = useState([() => {
  //   const getListNotes = async () => {
  //     const listNotes = isActiveNotes
  //       ? await getActiveNotes()
  //       : await getArchivedNotes();
  //     setNotes(listNotes.data);
  //   };
  //   getListNotes();
  // }]);

  // getListNotes();
  // async () => {
  //   const newData = await getActiveNotes();
  //   console.log('newData');
  //   console.log(newData);
  //   setNotes(newData);
  // };

  // async function getAllNotes() {
  //   const newData = await getActiveNotes();
  //   console.log('newData');
  //   console.log(newData);
  //   setNotes(newData);
  // }
  useEffect(() => {
    setLoading(true);
    const getListNotes = async () => {
      const listNotes = isActiveNotes
        ? await getActiveNotes()
        : await getArchivedNotes();
      setNotes(listNotes.data);
      setLoading(false);
    };
    getListNotes();
    // setLoading(false);
  }, [isActiveNotes]);
  // useEffect(() => {
  //   // const getNotes = async () => {
  //   //   const data = await getAllNotes();
  //   //   setNotes(data);
  //   // };

  //   isActiveNotes
  //     ? getActiveNotes().then(({ data }) => {
  //         setNotes(data);
  //       })
  //     : getArchivedNotes().then(({ data }) => {
  //         setNotes(data);
  //       });
  //   // noteList.then(({ data }) => {
  //   //   setNotes(data);
  //   // });
  // }, [isActiveNotes]);

  const onKeywordChangeHandler = (keyword) => {
    setKeyword(keyword);
    setSearchParams({ keyword });
  };

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  // const navigateTo = () => {
  //   navigate('/notes/new');
  // };

  return (
    <section>
      <h2>Catatan {isActiveNotes ? 'Aktif' : 'Arsip'}</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />

      {/* {loading && <h1>Loading.....</h1>} */}
      {loading ? (
        // <h1>Loading.......</h1>
        <Loading />
      ) : (
        // ) : notes.length > 0 ? (
        //   <NoteList notes={filteredNotes} />
        // ) : (
        //   <div className="notes-list-empty">
        //     <p>{isActiveNotes ? 'Catatan' : 'Arsip'} Tidak Ditemukan</p>
        //   </div>
        // )}
        <NoteList notes={filteredNotes} isActiveNotes={isActiveNotes} />
      )}
      {/* <NoteList notes={filteredNotes} isActiveNotes={isActiveNotes} /> */}

      {isActiveNotes && (
        <div className="homepage__action">
          <button
            className="action"
            type="button"
            title="Tambah"
            onClick={() => navigate('/notes/new')}
          >
            <FiPlus />
          </button>
        </div>
      )}
    </section>
  );
};

// MainPageWrapper.propType = {
//   pages: PropTypes.oneOf(['active', 'archived']).isRequired,
// };

MainPage.propType = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
  // pages: PropTypes.oneOf(['active', 'archived']).isRequired,
  isActiveNotes: PropTypes.bool.isRequired,
  navigateTo: PropTypes.func.isRequired,
};

// export default MainPageWrapper;
export default MainPage;
