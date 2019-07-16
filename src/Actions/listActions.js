
export const addNewList = (newList, setState) => {
  setState(state => ([...state, newList]));
};

export const deleteList = (listName, setState) => {
  setState(state => ([...state.filter(element => element.name !== listName)]));
};
