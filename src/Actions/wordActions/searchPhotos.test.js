/* eslint-disable */
import searchPhotosFactory from './searchPhotos.factory';

// mocking deps

let isMocksplashMethodCalled = false;

const Mocksplash = function() {
  this.search = {
    photos: async function(keyword){
      isMocksplashMethodCalled = true;
      return { res : ['url1', 'url2', 'url3'] }    
    }
  }
}

describe('searchPhotos', () => {
  let unsplash;
  let searchPhotos;
  beforeEach(() => {
    unsplash = new Mocksplash();
    searchPhotos = searchPhotosFactory(unsplash);
  });

  it('sends warning message if no query has been inserted', () => {
    searchPhotos().then(res => expect(res).toMatchObject({ msg: 'No Query Inserted'}));
  })

  it('calls unsplash correctly', () => {
    return searchPhotos('some')
    .then(res => {
      expect(isMocksplashMethodCalled).toBe(true)
    })
  })

  it('returns an array...almost testable', () => {
    return searchPhotos('some')
    .then(res => expect(typeof res).toBe('object'))
  })
});
