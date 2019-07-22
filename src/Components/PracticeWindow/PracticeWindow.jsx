import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './PracticeWindow.css';
import Flashcard from './Flashcard/Flashcard';

const PracticeWindow = ({ lists, isOpen, windowState }) => {
  // const render = (state) => {
  //   switch (state.case) { // TODO: finish it
  //     case 'word': return <Flashcard wordData={state.data} />;
  //     case 'excercise': return <>Mi sto esercitando</>;
  //     default: return (
  //       <div className="practiceWindow_container">
  //     Nothing has been chosen yet
  //       </div>
  //     );
  //   }
  // };

  switch (windowState.case) { // TODO: finish it
    case 'word': return <Flashcard wordData={windowState.data[0]}/>;
    case 'exercise': return (
      <div className="practiceWindow_container">
    Mi sto esercitando
      </div>
    );
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
  // isOpen: PropTypes.bool.required,
};

export default PracticeWindow;
