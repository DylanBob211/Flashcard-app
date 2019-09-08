
export default setState => (newList) => {
  setState(state => ([...state, newList]));
};
