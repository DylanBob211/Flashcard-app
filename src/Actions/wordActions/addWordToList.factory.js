// setState injection in flashcardApp component

export default ({ translateWord, searchPhotos }) => setWords => fetchedListId => (word) => {
  if (!fetchedListId) throw new Error('No List has been fetched for the list matching');
  if (!word) {
    return { msg: 'No Word Added' };
  }

  const newWord = {
    word,
    url: null,
  };

  translateWord(word)
    .then(wordInEnglish => Promise.resolve(searchPhotos(wordInEnglish)))
    .then(res => res.json())
    .catch(e => console.log(e))
    .then((res) => {
      const arrayOfPhotos = res.results
        .map(result => result.urls)
        .map(url => url.small)
        .slice(0, -1); // 9 urls of 10
      newWord.url = arrayOfPhotos;
    })
    .catch(() => { newWord.url = 'No Img Available'; })
    .then(() => setWords(state => state.map((list) => {
      if (fetchedListId === list.id) {
        return { ...list, words: [...list.words, newWord] };
      } return list;
    }))); // TODO: refactor, illeggibile
};
