import searchPhotosFactory from './searchPhotos.factory';

describe('searchPhotos', () => {
  let searchPhotos;
  const serverUrl = 'http://localhost:5000/searchphoto';
  const axios = {
    post: jest.fn(() => ({ data: { results: ['hello'] } })),
  };

  beforeEach(() => {
    searchPhotos = searchPhotosFactory(axios);
  });

  it('throws an error if no argument is passed', async () => {
    expect(searchPhotos()).rejects.toEqual(new Error('No keyword has been inserted'));
  });

  it('calls the unsplash search method correctly', () => {
    searchPhotos('hello');
    const objReq = {
      data: 'hello',
    };
    expect(axios.post).toHaveBeenCalledWith(serverUrl, objReq);
  });
});
