import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './WordItem.css';
import FlashcardPreview from './FlashcardPreview/FlashcardPreview';
import RemoveIcon from '../Icons/RemoveIcon';

const WordItem = ({
  wordItem, deleteWord, wordId, openFlashcard,
}) => {
  const [isMouseOver, setMouseOver] = useState(false);
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    deleteWord(wordItem.word, wordId);
  };

  let animID;

  const handleMouseOver = () => {
    animID = setTimeout(() => setMouseOver(true), 1000);
  };

  const handleMouseOut = () => {
    if (animID) {
      clearTimeout(animID);
    }
    setMouseOver(false);
  };
  return (
    <div
      role="button"
      tabIndex={0}
      onMouseOver={handleMouseOver}
      onFocus={handleMouseOver}
      onMouseOut={handleMouseOut}
      onBlur={handleMouseOut}
      onClick={() => openFlashcard(wordItem)}
      onKeyPress={() => openFlashcard(wordItem)}
    >
      {isMouseOver && (
        <FlashcardPreview
          name={wordItem.word}
          imgUrls={wordItem.url}
          toggleVisibility={isMouseOver}
        />
      )}
      <div className="wordItem_container">
        <li className="wordItem_name">{wordItem.word}</li>
        <RemoveIcon
          className="wordItem_remove"
          disabled={!deleteWord}
          onClick={e => handleDeleteClick(e)}
        />
      </div>
    </div>
  );
};

WordItem.propTypes = {
  wordItem: PropTypes.shape({
    word: PropTypes.string.isRequired,
    url: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  deleteWord: PropTypes.func,
  wordId: PropTypes.number.isRequired,
  openFlashcard: PropTypes.func,
};

WordItem.defaultProps = {
  deleteWord: null,
  openFlashcard: null,
};


export default WordItem;
