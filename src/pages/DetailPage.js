import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import NoteDetail from '../components/NoteDetail';
import { getNote, archiveNote, unarchiveNote, deleteNote } from '../utils/data';

const DetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [detailNote, setDetailNote] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getDetailNote = async (id) => {
      const detailNote = await getNote(id);
      setDetailNote(detailNote.data);
      setLoading(false);
    };
    getDetailNote(id);
  }, [id]);

  const onArchiveHandler = async (id) => {
    await archiveNote(id);
    navigate('/notes-app');
  };

  const onUnArchiveHandler = async (id) => {
    await unarchiveNote(id);
    navigate('/notes-app/archives');
  };

  const onDeleteHandler = async ({ id, archived }) => {
    await deleteNote(id);
    navigate(archived ? '/notes-app/archives' : '/notes-app');
  };

  if (detailNote === null) {
    return <p>Note is not found!</p>;
  }

  return (
    <section className="detail-page">
      {loading ? (
        <Loading />
      ) : (
        <NoteDetail
          data={detailNote}
          onArchive={onArchiveHandler}
          onUnArchive={onUnArchiveHandler}
          onDelete={onDeleteHandler}
        />
      )}
    </section>
  );
};

export default DetailPage;
