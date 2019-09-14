import React, { useState } from 'react';
import PropTypes from 'prop-types';
import initialState from '../initialState';
import { useErrorContext } from '../../Contexts/ErrorContext';
import { useListContext } from '../../Contexts/ListContext';
import addWordDependent from '../../Actions/wordActions/addWordToList';
import deleteWordDependent from '../../Actions/wordActions/deleteWord';
import ListCollection from '../ListCollection/ListCollection';
import PracticeWindow from '../PracticeWindow/PracticeWindow';
import ErrorModal from '../ErrorModal/ErrorModal';

const FlashcardApp = ({ languages }) => {
  const [, setLists] = useState(initialState);
  const [windowState, setWindowState] = useState({ case: '', data: [] });
  const [error] = useErrorContext();
  const { lists } = useListContext();

  /* handlers */
  const getFlashcardData = (listId, wordItem) => lists.filter(list => list.id === listId)[0]
    .words.filter(word => word.word === wordItem.word);

  const openFlashcard = listId => (wordItem) => {
    const flashcardData = getFlashcardData(listId, wordItem);
    setWindowState({ case: 'flashcard', data: flashcardData });
  };

  const getListData = listId => lists.filter(list => list.id === listId)[0];

  const openExerciseWindow = listId => () => {
    const listToPracticeData = getListData(listId);
    setWindowState({ case: 'practise', data: listToPracticeData });
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
