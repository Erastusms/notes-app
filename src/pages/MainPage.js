import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { getAllNotes, getActiveNotes, getArchivedNotes } from '../utils/data';
import { FiPlus } from 'react-icons/fi';

function MainPageWrapper({ pages }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const changeSearchParams = (keyword) => {
    setSearchParams({ keyword });
  };

  const homeNavigate = () => {
    navigate('/notes/new');
  };

  return (
    <>
      <MainPage
        defaultKeyword={keyword}
        keywordChange={changeSearchParams}
        pages={pages}
        navigateTo={homeNavigate}
      />
    </>
  );
}

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getAllNotes(),
      keyword: props.defaultKeyword || '',
    };

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      };
    });

    this.props.keywordChange(keyword);
  }

  render() {
    const pages = this.props.pages;
    const noteList = pages === 'active' ? getActiveNotes() : getArchivedNotes();
    const notes = noteList.filter((note) => {
      return note.title
        .toLowerCase()
        .includes(this.state.keyword.toLowerCase());
    });
    return (
      <section className={pages === 'active' ? 'homepage' : 'archived'}>
        <h2>Catatan {pages === 'active' ? 'Aktif' : 'Arsip'}</h2>
        <SearchBar
          keyword={this.props.keyword}
          keywordChange={this.onKeywordChangeHandler}
        />
        {notes.length > 0 ? (
          <NoteList notes={notes} />
        ) : (
          <div className="notes-list-empty">
            <p>{pages === 'active' ? 'Catatan' : 'Arsip'} Tidak Ditemukan</p>
          </div>
        )}
        {pages === 'active' && (
          <div className="homepage__action">
            <button
              className="action"
              type="button"
              title="Tambah"
              onClick={() => this.props.navigateTo()}
            >
              <FiPlus />
            </button>
          </div>
        )}
      </section>
    );
  }
}

MainPageWrapper.propType = {
  pages: PropTypes.string.isRequired,
};

export default MainPageWrapper;
