import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './PracticeWindow.css';
import Flashcard from './Flashcard/Flashcard';
import Exercise from './Exercise/Exercise'
const PracticeWindow = ({ windowState }) => {
  const practiceWindowWrapper = (Component, data) => <div className="practiceWindow_container"><Component data={data} /></div>;
  
  switch (windowState.case) { // TODO: finish it
    case 'flashcard': return practiceWindowWrapper(Flashcard, windowState.data);
    case 'practise': return practiceWindowWrapper(Exercise, windowState.data);
    default: return null;
  }
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
};

export default PracticeWindow;
