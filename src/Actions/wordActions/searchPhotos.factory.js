export default axios => async (keyword, proxy = 'http://localhost:5000/searchphoto') => {
  if (!keyword) throw new Error('No keyword has been inserted');
  try {
    const response = await axios.post(proxy, {
      data: keyword,
    });
    return response.data.results;
  } catch (e) {
    return { msg: e.message };
  }
};
