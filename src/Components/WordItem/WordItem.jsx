import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './WordItem.css';

const WordItem = ({
  wordItem, deleteWord, id, getFlashcardData, openFlashcard
}) => {
  const [isMouseOver, setMouseOver] = useState(false);
  const [mousePosition, setMousePosition] = useState({ mouseX: 0, mouseY: 0 });

  const handleMouseOver = () => {
    setMouseOver(!isMouseOver);
  };
  const handleMouseMove = (e) => {
    setMousePosition({ mouseX: e.clientX, mouseY: e.clientY });
  };

  return (
    <div
      onMouseOver={e => handleMouseOver(e)}
      onMouseOut={e => handleMouseOver(e)}
      onMouseMove={e => handleMouseMove(e)}
      onClick={e => openFlashcard(wordItem)}
    >
      <FlashcardPreview
        name={wordItem.word}
        picUrls={wordItem.url}
        isMouseOver={isMouseOver}
        mousePosition={mousePosition}
      />
      <div className="wordItem_container">
        <li className="wordItem_name">{wordItem.word}</li>
        <button className="wordItem_remove" onClick={e => deleteWord(wordItem.word, id)}>-</button>
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
  id: PropTypes.number.isRequired,
};


export default WordItem;

const FlashcardPreview = ({ picUrls, isMouseOver, name }) => {
  const dinamicStyle = {

    transition: isMouseOver ? '.5s all 1s' : '.3s all',
    transform: isMouseOver ? 'scaleZ(1) translate(0%, -101%)' : 'scaleZ(0) translate(10%, -101%)',
    transformOrigin: 'top',
    opacity: isMouseOver ? '0.9' : '0.2',
  };

  const renderImg = () => {
    if (picUrls[0] === 'No Img Available' || picUrls[0] === '') {
      return <img className="wordPreview_img" src={require('../../Assets/imgs/no_img.svg')} alt="no Word Preview" />;
    }
    return (
      <div className="wordPreview_imgContainer">
        {picUrls.map((url, ind) => (<img key={ind} className="wordPreview_img--small" src={url} alt="preview of pictures about this word" />))}
      </div>
    );
  };

  return (
    <div className="wordPreview_container" style={dinamicStyle}>
      <h3 className="wordPreview_title">{ name }</h3>
      {renderImg()}
    </div>
  );
};

FlashcardPreview.propTypes = {
  name: PropTypes.string.isRequired,
  picUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
  isMouseOver: PropTypes.bool.isRequired,
};
