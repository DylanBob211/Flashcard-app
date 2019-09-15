import Unsplash from 'unsplash-js';
import searchPhotosFactory from './searchPhotos.factory';

const unsplash = new Unsplash({
  applicationId: 'YOUR_API_KEY',
});

export default searchPhotosFactory(unsplash);
