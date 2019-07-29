
const translateWordFactory = deps => async (word) => {
  if (!word) return { msg: 'No Word Inserted' };

  try {
    const res = await deps.axios.post('http://localhost:5000/', {
      word,
      lang: 'it-en',
    });

    return res.data.text[0];
  } catch (e) {
    return {
      msg: 'Something went wrong',
    };
  }
};

module.exports = translateWordFactory;
