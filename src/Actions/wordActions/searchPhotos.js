import Unsplash from 'unsplash-js';
import searchPhotosFactory from './searchPhotos.factory';

const unsplash = new Unsplash({
  applicationId: process.env.UNSPLASH_API_KEY,
});

export default searchPhotosFactory(unsplash);
