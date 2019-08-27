import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../ListItem/ListItem';
import './ListCollection.css';
import ListForm from '../ListForm/ListForm';

const ListCollection = ({
  lists, deleteList, addWord, deleteWord, openFlashcard, openExerciseWindow, handleError, addNewList,
}) => (
  <div className="lists_container">
    {lists.map(listItem => (
      <ListItem
        deleteList={deleteList}
        addWord={addWord}
        deleteWord={deleteWord}
        key={listItem.id}
        listId={listItem.id}
        listName={listItem.name}
        wordsArray={listItem.words}
        openFlashcard={openFlashcard}
        openExerciseWindow={openExerciseWindow}
        handleError={handleError}
      />
    ))}
    <ListForm
      handleError={handleError}
      addNewList={addNewList}
    />
  </div>
);

ListCollection.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    words: PropTypes.arrayOf(
      PropTypes.shape({
        word: PropTypes.string,
        url: PropTypes.arrayOf(PropTypes.string),
      }),
    ),
  })),
  addNewList: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
  addWord: PropTypes.func.isRequired,
  deleteWord: PropTypes.func.isRequired,
  openFlashcard: PropTypes.func.isRequired,
  openExerciseWindow: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
};

ListCollection.defaultProps = {
  lists: [],
};

export default ListCollection;
