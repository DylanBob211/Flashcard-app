

export default setState => (listName) => {
  setState(state => ([...state.filter(element => element.name !== listName)]));
};
