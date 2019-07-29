import translateWord from './translateWord';
import searchPhotos from './searchPhotos';
import addWordToListFactory from './addWordToList.factory';

const deps = { translateWord, searchPhotos };

export default addWordToListFactory(deps);
