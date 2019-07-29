import Unsplash from 'unsplash-js';
import searchPhotosFactory from './searchPhotos.factory';

const unsplash = new Unsplash({
  applicationId: '66c8f4bbdcd250ba88db15412fb4cf728a9a8c4db261db2a356b22a1365aa20a',
});

export default searchPhotosFactory(unsplash);
