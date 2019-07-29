

export default (listName, setState) => {
  setState(state => ([...state.filter(element => element.name !== listName)]));
};
