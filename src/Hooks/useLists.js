import { useState } from 'react';
import initialState from '../Components/initialState';
import addNewListDependent from '../Actions/listActions/addNewList';
import deleteNewListDependent from '../Actions/listActions/deleteList';
import addWordToListDependent from '../Actions/wordActions/addWordToList';
import deleteWordDependent from '../Actions/wordActions/deleteWord';

const useLists = () => {
  const [lists, setLists] = useState(initialState);

  const addNewList = addNewListDependent(setLists);
  const deleteList = deleteNewListDependent(setLists);
  const addWord = addWordToListDependent(setLists);
  const deleteWord = deleteWordDependent(setLists);

  return {
    lists,
    setLists,
    addNewList,
    deleteList,
    addWord,
    deleteWord,
  };
};

export default useLists;
