import React from 'react';
import PropTypes from 'prop-types';
import TrashBinIcon from '../../Icons/TrashBinIcon';
import PlayIcon from '../../Icons/PlayIcon';
import './ListHeader.css';


const ListHeader = ({ listName, deleteList, openExerciseWindow }) => (
  <div className="listItem_header_container">
    <h2 className="listItem_title">{ listName }</h2>
    <div className="listItem_iconbox">
      <TrashBinIcon
        data-test="deleteListIconButton"
        disabled={!deleteList}
        onClick={() => deleteList(listName)}
        className="listItem_icon--trashbin"
      />
      <PlayIcon
        disabled={!openExerciseWindow}
        className="listItem_icon--play"
        onClick={openExerciseWindow}
      />
    </div>
  </div>
);

ListHeader.propTypes = {
  listName: PropTypes.string,
  deleteList: PropTypes.func,
  openExerciseWindow: PropTypes.func,
};

ListHeader.defaultProps = {
  listName: '',
  deleteList: null,
  openExerciseWindow: null,
};

export default ListHeader;
