export default axios => async (keyword) => {
  if (!keyword) throw new Error('No keyword has been inserted');
  try {
    const response = await axios.post('http://localhost:5000/searchphoto', {
      data: keyword
    });
    console.log(response)
    return response.data.results;
  } catch (e) {
    return { msg: e.message };
  }
};
