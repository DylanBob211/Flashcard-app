const axios = require('axios').default;


const translateWord = (word) => {
  axios.post('http://localhost:5000/', {
    word,
    lang: 'it-en', // TODO : language hardcoded, make dynamic
  }).then(res => console.log(res));
};

translateWord('mamma');
