import React, { useState, useEffect } from 'react';
import initialState from '../initialState';
import addNewListDependent from '../../Actions/listActions/addNewList';
import deleteListDependent from '../../Actions/listActions/deleteList';
import addWordDependent from '../../Actions/wordActions/addWordToList';
import deleteWordDependent from '../../Actions/wordActions/deleteWord';
import Lists from '../Lists/Lists';
import ListForm from '../ListForm/ListForm';
import PracticeWindow from '../PracticeWindow';

const FlashcardApp = () => {

  const [lists, setLists] = useState(initialState);

  const [isPractiseWindowOpen, setPracticeWindowOpen] = useState(false);
  const [windowState, setWindowState] = useState({ case: '', data: [] });

  useEffect(() => {
    console.log(lists);
  }, [lists]);

  /* handlers */
  const getFlashcardData = (listId, wordItem) => lists.filter(list => list.id === listId)[0]
    .words.filter(word => word.word === wordItem.word);

  const openFlashcard = listId => (wordItem) => {
    setPracticeWindowOpen(true);
    const flashcardData = getFlashcardData(listId, wordItem);
    setWindowState({ case: 'word', data: [flashcardData] });
  };

  /* setState injections */

  const addWord = addWordDependent(setLists);
  const deleteWord = deleteWordDependent(setLists);
  const addNewList = newList => addNewListDependent(newList, setLists);
  const deleteList = listName => deleteListDependent(listName, setLists);


  return (
    <div>
      <ListForm addNewList={addNewList} />
      <Lists
        addWord={addWord}
        deleteWord={deleteWord}
        deleteList={deleteList}
        lists={lists}
        getFlashcardData={getFlashcardData}
        openFlashcard={openFlashcard}
      />
      <PracticeWindow
        lists={lists}
        getFlashcardData={getFlashcardData}
        isOpen={isPractiseWindowOpen}
        windowState={windowState}
      />
    </div>
  );
};

export default FlashcardApp;
