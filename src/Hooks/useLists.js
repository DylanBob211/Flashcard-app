import { useState } from 'react';
import initialState from '../Components/initialState';
import addNewListDependent from '../Actions/listActions/addNewList';

const useLists = () => {
  const [lists, setLists] = useState(initialState);

  const addNewList = addNewListDependent(setLists);

  return {
    lists,
    setLists,
    addNewList,
  };

};

export default useLists;
