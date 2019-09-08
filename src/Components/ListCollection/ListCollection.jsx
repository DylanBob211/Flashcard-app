import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../ListItem/ListItem';
import './ListCollection.css';
import ListForm from '../ListForm/ListForm';

const ListCollection = ({
  lists, addWord, deleteWord, openFlashcard, openExerciseWindow,
}) => (
  <div
    className="lists_container"
    data-test="listCollectionContainer"
  >
    {lists.map(listItem => (
      <ListItem
        addWord={addWord}
        deleteWord={deleteWord}
        key={listItem.id}
        listId={listItem.id}
        listName={listItem.name}
        wordsArray={listItem.words}
        openFlashcard={openFlashcard}
        openExerciseWindow={openExerciseWindow}
      />
    ))}
    <ListForm />
  </div>
);

ListCollection.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    words: PropTypes.arrayOf(
      PropTypes.shape({
        word: PropTypes.string,
        url: PropTypes.arrayOf(PropTypes.string),
      }).isRequired,
    ),
  })),
  addWord: PropTypes.func.isRequired,
  deleteWord: PropTypes.func.isRequired,
  openFlashcard: PropTypes.func.isRequired,
  openExerciseWindow: PropTypes.func.isRequired,
};

ListCollection.defaultProps = {
  lists: [],
};

export default ListCollection;
