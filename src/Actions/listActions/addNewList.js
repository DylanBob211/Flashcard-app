
export default (newList, setState) => {
  setState(state => ([...state, newList]));
};
