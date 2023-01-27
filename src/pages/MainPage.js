import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { getActiveNotes, getArchivedNotes } from '../utils/data';
import { FiPlus } from 'react-icons/fi';
import Loading from '../components/Loading';

const MainPage = ({ isActiveNotes }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get('keyword') || '';
  });
  const [notes, setNotes] = useState([]);

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
  }, [isActiveNotes]);

  const onKeywordChangeHandler = (keyword) => {
    setKeyword(keyword);
    setSearchParams({ keyword });
  };

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <section>
      <h2>Catatan {isActiveNotes ? 'Aktif' : 'Arsip'}</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      {loading ? (
        <Loading />
      ) : (
        <NoteList notes={filteredNotes} isActiveNotes={isActiveNotes} />
      )}
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

MainPage.propType = {
  isActiveNotes: PropTypes.bool.isRequired,
};

export default MainPage;
