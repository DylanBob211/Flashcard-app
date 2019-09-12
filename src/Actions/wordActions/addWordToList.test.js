import addWordToListFactory from './addWordToList.factory';

describe('addWordToList', () => {
  let addWordToList;
  const translateWord = jest.fn(async () => 'word translated');
  const searchPhotos = jest.fn(async () => (
    [
      { urls: { small: 'urlNumberOne' } },
      { urls: { small: 'urlNumberTwo' } },
      { urls: { small: 'urlNumberThree' } },
    ]
  ));
  const setWords = jest.fn();
  const listId = 'someUniqueId';
  const word = 'parola da tradurre';
  const langToPair = 'it';

  beforeEach(() => {
    addWordToList = addWordToListFactory({ translateWord, searchPhotos })(setWords);
  });

  it('throws an error message if a fetchedListId argument is not passed', () => {
    expect(addWordToList()()).rejects.toEqual(new Error('No list has been fetched for the list matching'));
  });

  it('throws an error message if a word is not passed', () => {
    expect(addWordToList(listId)()).rejects.toEqual(new Error('No word has been passed to the function'));
  });

  it('throws an error if no langToPair has been passed', () => {
    expect(addWordToList(listId)(word)).rejects.toEqual(new Error('No pairing language has been selected'));
  });

  describe('with every argument passed', () => {
    beforeEach(() => {
      addWordToList(listId)(word, langToPair);
    });

    it('calls translateWord with a language pair defaulting to english', () => {
      expect(translateWord).toHaveBeenCalledWith(word, `${langToPair}-en`);
    });

    it('calls the searchPhotos passing the word translated to english as the query keyword', () => {
      expect(searchPhotos).toHaveBeenCalledWith('word translated');
    });

    it('calls setWords', () => {
      expect(setWords).toHaveBeenCalled();
    });

    it('calls setWords with an object `newWord` with the proprety `url` containing the different photos url', async () => {
      const newWord = {
        word,
        url: ['urlNumberOne', 'urlNumberTwo', 'urlNumberThree'],
      };
      const result = await addWordToList(listId)(word, langToPair);
      expect(result).toEqual(newWord);
    });

    it('sets the property `url` of the newWord object to `no image available` if photos is empty', async () => {
      const deps = {
        translateWord,
        searchPhotos: jest.fn(async () => []),
      };
      const addWordToListNoPhotos = addWordToListFactory(deps)(setWords);
      const newWord = {
        word,
        url: ['No Img Available'],
      };
      const result = await addWordToListNoPhotos(listId)(word, langToPair);
      expect(result).toEqual(newWord);
    });
  });
});
