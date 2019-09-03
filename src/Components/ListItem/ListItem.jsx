import React from 'react';
import PropTypes from 'prop-types';
import WordItem from '../WordItem/WordItem';
import WordForm from '../WordForm/WordForm';
import './ListItem.css';
import ListHeader from './ListHeader/ListHeader';


const ListItem = ({
  listId, wordsArray, listName, deleteList, addWord,
  deleteWord, openFlashcard, openExerciseWindow,
}) => {
  const listOfWords = wordsArray.map((word, index) => (
    <WordItem
      deleteWord={deleteWord(listId)}
      wordItem={word}
      key={`${word} ${listId} ${index}`}
      wordId={index}
      openFlashcard={openFlashcard(listId)}
    />
  ));

  return (
    <div
      className="listItem_container"
      data-test="listItemContainer"
    >
      <ListHeader
        listName={listName}
        deleteList={deleteList}
        openExerciseWindow={openExerciseWindow(listId)}
      />
      <ul className="listItem_wordList">{ listOfWords }</ul>
      <WordForm
        addWord={addWord(listId)}
      />
    </div>
  );
};

ListItem.propTypes = {
  listId: PropTypes.string.isRequired,
  wordsArray: PropTypes.arrayOf(PropTypes.shape({
    word: PropTypes.string.isRequired,
    url: PropTypes.arrayOf(PropTypes.string).isRequired,
  })),
  listName: PropTypes.string,
  deleteList: PropTypes.func.isRequired,
  addWord: PropTypes.func.isRequired,
  deleteWord: PropTypes.func.isRequired,
  openFlashcard: PropTypes.func.isRequired,
  openExerciseWindow: PropTypes.func.isRequired,
};

ListItem.defaultProps = {
  wordsArray: [{ word: '', url: [] }],
  listName: '',
};

export default ListItem;
