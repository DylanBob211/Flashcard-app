import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../ListItem/ListItem';
import './Lists.css';

const Lists = ({
  lists, deleteList, addWord, deleteWord, openFlashcard, openExerciseWindow, handleError,
}) => (
  <div className="lists_container">
    {lists.map(listItem => (
      <ListItem
        deleteList={deleteList}
        addWord={addWord}
        deleteWord={deleteWord}
        key={listItem.id} // TODO: change key and id to uniqueID
        id={listItem.id}
        listName={listItem.name}
        wordsArray={listItem.words}
        openFlashcard={openFlashcard}
        openExerciseWindow={openExerciseWindow}
        handleError={handleError}
      />
    ))}
  </div>
);

Lists.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    words: PropTypes.arrayOf(
      PropTypes.shape({
        word: PropTypes.string,
        url: PropTypes.arrayOf(PropTypes.string),
      }),
    ),
  })).isRequired,
  deleteList: PropTypes.func.isRequired,
  addWord: PropTypes.func.isRequired,
  deleteWord: PropTypes.func.isRequired,
  openFlashcard: PropTypes.func.isRequired,
  openExerciseWindow: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
};

export default Lists;
