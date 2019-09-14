export default ({ translateWord, searchPhotos }) =>
  setWords => fetchedListId => async (word, langToPair) => {
    if (!fetchedListId) throw new Error('No list has been fetched for the list matching');
    if (!word) throw new Error('No word has been passed to the function');
    if (!langToPair) throw new Error('No pairing language has been selected');

    const newWord = {
      word,
      url: [],
    };
    try {
      const wordTranslated = await translateWord(word, `${langToPair}-en`);
      const photos = await searchPhotos(wordTranslated);
      if (!photos[0]) newWord.url = ['No Img Available'];
      else {
        const photosForObject = photos
          .map(element => element.urls)
          .map(url => url.small)
          .slice(0, 9); // 9 urls of 10
        newWord.url = photosForObject;
      }
      setWords(state => state.map(
        list => (fetchedListId === list.id ? { ...list, words: [...list.words, newWord] } : list),
      ));
      return newWord;
    } catch (e) {
      console.error(e.message);
      return { msg: 'Something is wrong with the server' };
    }
  };
