import translateWordFactory from './translateWord.factory';

describe('translateWord', () => {
  const axios = {
    post: jest.fn(() => ({ data: { text: [] } })),
  };
  let translateWord;

  beforeEach(() => {
    translateWord = translateWordFactory({ axios });
  });

  it('returns an error message if nothing is passed as argument', async () => {
    expect(translateWord()).rejects.toEqual(new Error('No word to translate has been inserted'));
  });

  describe('when an argument is passed', () => {
    it('throws an error message if a non-string is passed', async () => {
      expect(translateWord(true)).rejects.toEqual(new Error('Invalid input type'));
    });

    it('calls axios with word argument passed and default arguments', async () => {
      translateWord('hello');
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5000/translate',
        {
          word: 'hello',
          lang: 'it-en',
        },
      );
    });
  });
});
