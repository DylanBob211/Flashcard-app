import Unsplash from 'unsplash-js';
import axios from 'axios';

const translateWord = word => new Promise((resolve) => {
  axios.post('http://localhost:5000/', {
    word,
    lang: 'it-en', // TODO : language hardcoded, make dynamic
  })
    .then((res) => {
      resolve(res.data.text[0]);
    })
    .catch(e => console.log(e));
});

const unsplash = new Unsplash({
  applicationId: '66c8f4bbdcd250ba88db15412fb4cf728a9a8c4db261db2a356b22a1365aa20a',
});

export const addWord = (word, setWords, listId) => {
  if (!word) {
    console.warn('Inserisci una parola');
  } else {
    const newWord = {
      word,
      url: null,
    };

    translateWord(word)
      .then(wordInEnglish => new Promise(resolve => resolve(unsplash.search.photos(wordInEnglish))))
      .catch(e => console.log(`errore : ${e}`))
      .then(res => res.json())
      .catch(e => console.log(e))
      .then((res) => {
        const arrayOfPhotos = res.results
          .map(result => result.urls)
          .map(url => url.small)
          .slice(0, -1); // 9 urls of 10
        newWord.url = arrayOfPhotos;
      })
      .catch(() => newWord.url = 'No Img Available')
      .then(() => setWords(state => state.map((list, index) => {
        if (listId === index) {
          return { ...list, words: [...list.words, newWord] };
        } return list;
      }))); // TODO: refactor, illeggibile
  }
};

export const deleteWord = (wordName, setWords, listId) => {
  setWords(state => state.map((list, index) => {
    if (listId === index) {
      return { ...list, words: [...list.words.filter(element => element.word !== wordName)] };
    } return list;
  }));
};
