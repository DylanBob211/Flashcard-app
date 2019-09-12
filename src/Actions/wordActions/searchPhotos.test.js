import searchPhotosFactory from './searchPhotos.factory';

describe('searchPhotos', () => {
  let searchPhotos;
  const unsplashMock = {
    search: {
      photos: jest.fn(() => ['urlOne', 'urlTwo']),
    },
  };

  beforeEach(() => {
    searchPhotos = searchPhotosFactory(unsplashMock);
  });

  it('throws an error if no argument is passed', async () => {
    expect(searchPhotos()).rejects.toEqual(new Error('No keyword has been inserted'));
  });

  it('calls the unsplash search method correctly', () => {
    searchPhotos('hello');
    expect(unsplashMock.search.photos).toHaveBeenCalledWith('hello');
  });
});
