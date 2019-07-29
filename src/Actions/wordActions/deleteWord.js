// dependencies injected in flashcard app

const deleteWord = setWords => listId => (wordName) => {
  if (!listId && typeof listId !== 'string') throw new Error('No ListId has been passed');
  if (!wordName && typeof wordName !== 'string') throw new Error('No Word Name has been passed');

  setWords(state => state.map((list) => {
    if (listId === list.id) {
      return { ...list, words: [...list.words.filter(element => element.word !== wordName)] };
    } return list;
  }));
};

export default deleteWord;
