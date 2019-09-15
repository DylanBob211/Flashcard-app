const translateWordFactory = ({ axios }) => async (word, languageCodePair = 'it-en', proxy = 'http://localhost:5000/translate') => {
  if (!word) throw new Error('No word to translate has been inserted');
  if (typeof word !== 'string') throw new Error('Invalid input type');

  try {
    const res = await axios.post(proxy, {
      word,
      lang: languageCodePair,
    });

    return res.data.text[0];
  } catch (e) {
    console.warn(e.message);
    return {
      msg: 'Something went wrong with the server',
    };
  }
};

module.exports = translateWordFactory;
