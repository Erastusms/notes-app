import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import NoteDetail from '../components/NoteDetail';
import { getNote, archiveNote, unarchiveNote } from '../utils/data';

function DetailPageWrapper() {
  const navigate = useNavigate();
  const { id } = useParams();
  const navigateTo = (nav) => {
    navigate(nav);
  }
  return <DetailPage id={id} navigate={navigateTo} />;
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: getNote(props.id),
    };

    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onUnArchiveHandler = this.onUnArchiveHandler.bind(this);
  }

  onArchiveHandler(id) {
    archiveNote(id);
    this.props.navigate('/');
  }

  onUnArchiveHandler(id) {
    unarchiveNote(id);
    this.props.navigate('/archives');
  }

  render() {
    if (this.state.note === null) {
      return <p>Note is not found!</p>;
    }

    return (
      <section className="detail-page">
        <NoteDetail
          {...this.state.note}
          onArchive={this.onArchiveHandler}
          onUnArchive={this.onUnArchiveHandler}
        />
      </section>
    );
  }
}

DetailPage.propType = {
  id: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default DetailPageWrapper;
