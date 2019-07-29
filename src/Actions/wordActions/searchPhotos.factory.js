
export default unsplash => async (keyword) => {
  if (!keyword) return { msg: 'No Query Inserted' };

  try {
    const photos = await unsplash.search.photos(keyword);
    return photos;
  } catch (e) {
    console.log(e);
    return { msg: 'Something went wrong' };
  }
};
