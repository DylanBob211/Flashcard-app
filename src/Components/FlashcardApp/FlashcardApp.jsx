import React, { useState, useEffect } from 'react';
import initialState from '../initialState';
import addNewListDependent from '../../Actions/listActions/addNewList';
import deleteListDependent from '../../Actions/listActions/deleteList';
import addWordDependent from '../../Actions/wordActions/addWordToList';
import deleteWordDependent from '../../Actions/wordActions/deleteWord';
import Lists from '../Lists/Lists';
import ListForm from '../ListForm/ListForm';
import PracticeWindow from '../PracticeWindow';
import ErrorModal from '../ErrorModal/ErrorModal';

const FlashcardApp = () => {

  const [lists, setLists] = useState(initialState);
  const [windowState, setWindowState] = useState({ case: '', data: [] });
  const [error, setError] = useState('');

  useEffect(() => {
    console.log(lists);
  }, [lists]);

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

  /* setState injections */
  const addWord = addWordDependent(setLists);
  const deleteWord = deleteWordDependent(setLists);
  const addNewList = newList => addNewListDependent(newList, setLists);
  const deleteList = listName => deleteListDependent(listName, setLists);


  return (
    <div>
      <ErrorModal text={error} />
      <ListForm
        addNewList={addNewList}
        handleError={setError}
      />
      <Lists
        addWord={addWord}
        deleteWord={deleteWord}
        deleteList={deleteList}
        lists={lists}
        getFlashcardData={getFlashcardData}
        openFlashcard={openFlashcard}
        openExerciseWindow={openExerciseWindow}
        handleError={setError}
      />
      <PracticeWindow
        windowState={windowState}
        closeExerciseWindow={closeExerciseWindow}
      />
    </div>
  );
};

export default FlashcardApp;
