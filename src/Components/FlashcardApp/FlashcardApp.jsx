import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useErrorContext } from '../../Contexts/ErrorContext';
import { useListContext } from '../../Contexts/ListContext';
import ListCollection from '../ListCollection/ListCollection';
import PracticeWindow from '../PracticeWindow/PracticeWindow';
import ErrorModal from '../ErrorModal/ErrorModal';

const FlashcardApp = ({ languages }) => {
  const [windowState, setWindowState] = useState({ case: '', data: [] });
  const [error] = useErrorContext();
  const { lists } = useListContext();
  
  /* handlers */
  const getFlashcardData = (listId, wordItem) => lists.filter(list => list.id === listId)[0]
    .words.filter(word => word.word === wordItem.word)[0];

  const openFlashcard = listId => (wordItem) => {
    const flashcardData = getFlashcardData(listId, wordItem);
    setWindowState({ case: 'flashcard', data: flashcardData });
  };

  const getListData = listId => lists.filter(list => list.id === listId)[0];

  const openExerciseWindow = listId => () => {
    const listToPracticeData = getListData(listId);
    setWindowState({ case: 'list', data: listToPracticeData });
  };
  const closeExerciseWindow = () => {
    setWindowState(state => ({ ...state, case: '' }));
  };

  return (
    <div data-test="FlashcardAppContainer">
      <ErrorModal text={error} />
      <ListCollection
        lists={lists}
        getFlashcardData={getFlashcardData}
        openFlashcard={openFlashcard}
        openExerciseWindow={openExerciseWindow}
      />
      <PracticeWindow
        windowState={windowState}
        closeExerciseWindow={closeExerciseWindow}
      />
    </div>
  );
};

export default FlashcardApp;

FlashcardApp.propTypes = {
  languages: PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string,
  }),
};

FlashcardApp.defaultProps = {
  languages: {
    from: 'en',
    to: 'it',
  },
};
