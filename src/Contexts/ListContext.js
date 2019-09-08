import React, { useContext } from 'react';
import initialState from '../Components/initialState';
import useLists from '../Hooks/useLists';

const ListContext = React.createContext([initialState, () => {}]);

export const useListContext = () => useContext(ListContext);

const ListProvider = ({ children }) => {
  const listProps = useLists();
  return (
    <ListContext.Provider value={{ ...listProps }}>
      {children}
    </ListContext.Provider>
  );
};

export default ListProvider;
