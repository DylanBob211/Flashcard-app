export default unsplash => async (keyword) => {
  if (!keyword) throw new Error('No keyword has been inserted');
  try {
    const response = await unsplash.search.photos(keyword);
    const photos = await response.json();
    return photos.results;
  } catch (e) {
    return { msg: e.message };
  }
};
