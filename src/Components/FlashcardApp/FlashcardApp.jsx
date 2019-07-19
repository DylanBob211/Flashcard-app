import React, { useState, useEffect } from 'react';
import uuidv4 from 'uuidv4';
import { addNewList as addNewListDependent, deleteList as deleteListDependent } from '../../Actions/listActions';
import { addWord as addWordDependent, deleteWord as deleteWordDependent } from '../../Actions/wordActions';
import Lists from '../Lists/Lists';
import ListForm from '../ListForm/ListForm';
import PracticeWindow from '../PracticeWindow';

const FlashcardApp = () => {
  const [lists, setLists] = useState([
    { id: uuidv4(), name: 'Rifiuti', words: [{ word: 'secchio della spazzatura', url: ['No Img Available'] }, { word: 'discarica', url: ['No Img Available'] }] },
    { id: uuidv4(), name: 'Cibo', words: [{ word: 'pizza', url: ['No Img Available'] }, { word: 'insalata', url: ['No Img Available'] }] },
    { id: uuidv4(), name: 'Viaggiare', words: [{ word: 'maremma', url: ['No Img Available'] }, { word: 'colcane', url: ['No Img Available'] }] },
  ]);

  const [isPractiseWindowOpen, setPracticeWindowOpen] = useState(false);

  useEffect(() => {
    console.log(lists);
  }, [lists]);

  const getFlashcardData = listId => (wordItem) => {
    const flashcardData = lists.filter(list => list.id === listId)[0]
      .words.filter(word => word.word === wordItem.word);
    console.log(flashcardData);
  };

  /* curried word Actions with dependencies injected */

  const addWord = fetchedId => newWord => addWordDependent(newWord, setLists, fetchedId);
  const deleteWord = id => wordName => deleteWordDependent(wordName, setLists, id);

  /** ******************* */

  /* List Actions with dependencies injected */

  const addNewList = newList => addNewListDependent(newList, setLists);
  const deleteList = listName => deleteListDependent(listName, setLists);

  /** **************** */

  return (
    <div>
      <ListForm addNewList={addNewList} />
      <Lists
        addWord={addWord}
        deleteWord={deleteWord}
        deleteList={deleteList}
        lists={lists}
        getFlashcardData={getFlashcardData}
      />
      <PracticeWindow
        lists={lists}
        getFlashcardData={getFlashcardData}
        isOpen={isPractiseWindowOpen}
      />
    </div>
  );
};

export default FlashcardApp;
