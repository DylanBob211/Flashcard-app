import React, { useContext } from 'react';
import initialState from '../Components/initialState';
import useLists from '../Hooks/useLists';

const ListContext = React.createContext([initialState, () => {}]);

export const useListContext = () => useContext(ListContext);

const ListProvider = ({ children }) => {
  const { lists, setLists, addNewList } = useLists();
  return (
    <ListContext.Provider value={{ lists, setLists, addNewList }}>
      {children}
    </ListContext.Provider>
  );
};

export default ListProvider;
