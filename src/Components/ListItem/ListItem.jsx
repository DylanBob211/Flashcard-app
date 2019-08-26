import React from 'react';
import PropTypes from 'prop-types';
import WordItem from '../WordItem/WordItem';
import WordForm from '../WordForm/WordForm';
import './ListItem.css';
import TrashBinIcon from '../Icons/TrashBinIcon';
import PlayIcon from '../Icons/PlayIcon';


const ListItem = ({
  id, wordsArray, listName, deleteList, addWord,
  deleteWord, openFlashcard, openExerciseWindow, handleError,
}) => {
  const listOfWords = wordsArray.map((word, index) => (
    <WordItem
      deleteWord={deleteWord(id)}
      wordItem={word}
      key={index}
      id={index}
      openFlashcard={openFlashcard(id)}
    />
  ));

  return (
    <div className="listItem_container">
      <ListHeader
        listName={listName}
        deleteList={deleteList}
        openExerciseWindow={openExerciseWindow(id)}
      />
      <ul className="listItem_wordList">{ listOfWords }</ul>
      <WordForm
        addWord={addWord(id)}
        handleError={handleError}
      />
    </div>
  );
};

ListItem.propTypes = {
  id: PropTypes.string.isRequired,
  wordsArray: PropTypes.arrayOf(PropTypes.shape({
    word: PropTypes.string.isRequired,
    url: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
  listName: PropTypes.string.isRequired,
  deleteList: PropTypes.func.isRequired,
  addWord: PropTypes.func.isRequired,
  deleteWord: PropTypes.func.isRequired,
  openFlashcard: PropTypes.func.isRequired,
  openExerciseWindow: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
};


const ListHeader = ({ listName, deleteList, openExerciseWindow }) => (
  <div className="listItem_header_container">
    <h2 className="listItem_title">{ listName }</h2>
    <div className="listItem_iconbox">
      <TrashBinIcon onClick={() => deleteList(listName)} className="listItem_icon--trashbin" />
      <PlayIcon className="listItem_icon--play" onClick={openExerciseWindow} />
    </div>
  </div>
);

ListHeader.propTypes = {
  listName: PropTypes.string.isRequired,
  deleteList: PropTypes.func.isRequired,
  openExerciseWindow: PropTypes.func.isRequired,
};

export default ListItem;
