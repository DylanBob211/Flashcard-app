import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PracticeWindow.css';
import Flashcard from './Flashcard/Flashcard';

const PracticeWindow = ({ lists, isOpen }) => {

  
  const render = () => {
    switch (1) { // TODO: finish it
      case 'word': return <Flashcard word={lists} />;
      default: return (
        <div className="practiceWindow_container">
      Nothing has been chosen yet
        </div>
      );
    }
  };

  return isOpen ? render() : null;
};

PracticeWindow.propTypes = {
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
  isOpen: PropTypes.bool.required,
};

export default PracticeWindow;
