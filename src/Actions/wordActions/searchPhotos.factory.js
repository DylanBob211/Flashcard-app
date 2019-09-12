export default unsplash => async (keyword) => {
  if (!keyword) throw new Error('No keyword has been inserted');
  try {
    const photos = await unsplash.search.photos(keyword);
    return photos;
  } catch (e) {
    return { msg: e.message };
  }
};
