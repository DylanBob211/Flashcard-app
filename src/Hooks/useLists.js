import { useState } from 'react';
import initialState from '../Components/initialState';
import addNewListDependent from '../Actions/listActions/addNewList';
import deleteNewListDependent from '../Actions/listActions/deleteList';

const useLists = () => {
  const [lists, setLists] = useState(initialState);

  const addNewList = addNewListDependent(setLists);
  const deleteList = deleteNewListDependent(setLists);

  return {
    lists,
    setLists,
    addNewList,
    deleteList,
  };
};

export default useLists;
