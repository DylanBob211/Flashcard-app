import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './WordItem.css';
import FlashcardPreview from './FlashcardPreview/FlashcardPreview';
import RemoveIcon from '../Icons/RemoveIcon';

const WordItem = ({
  wordItem, deleteWord, wordId, openFlashcard,
}) => {
  const [isMouseOver, setMouseOver] = useState(false);
  const handleMouseOver = () => {
    setMouseOver(!isMouseOver);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onMouseOver={e => handleMouseOver(e)}
      onFocus={e => handleMouseOver(e)}
      onMouseOut={e => handleMouseOver(e)}
      onBlur={e => handleMouseOver(e)}
      onClick={() => openFlashcard(wordItem)}
      onKeyPress={() => openFlashcard(wordItem)}
    >
      <FlashcardPreview
        name={wordItem.word}
        picUrls={wordItem.url}
        isMouseOver={isMouseOver}
      />
      <div className="wordItem_container">
        <li className="wordItem_name">{wordItem.word}</li>
        <RemoveIcon
          className="wordItem_remove"
          onClick={() => deleteWord(wordItem.word, wordId)}
        />
      </div>
    </div>
  );
};

WordItem.propTypes = {
  wordItem: PropTypes.shape({
    word: PropTypes.string.isRequired,
    url: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
  deleteWord: PropTypes.func.isRequired,
  wordId: PropTypes.number.isRequired,
};


export default WordItem;
