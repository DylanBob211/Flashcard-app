/* eslint-disable */
import addWordToListFactory from './addWordToList.factory';
import axios from 'axios';

// mocks
let isTranslateWordMockCalledWithArgument = false;
const translateWordMock = async (word) => {
  if(word === 'ciao'){
    isTranslateWordMockCalledWithArgument = true;
    return 'hello'
  }
  return 'sth'
}

jest.mock('axios');
// TODO: mock successfully axios
const searchPhotosMock = async () => {
  const data = await axios.get.mockResolvedValue({ msg: ['url1, url2, url3'] })
  return data;
}

describe('addWordToList with deps injected', () => {
  let deps;
  let setWordDep;
  let addWordToList;
  beforeEach(() => {
    deps = {
      translateWord: translateWordMock,
      searchPhotos: searchPhotosMock
    }
    setWordDep = jest.fn();
    addWordToList = addWordToListFactory(deps)(setWordDep)
  })
  
  it('throws an error if no list has been found', () => {
    expect(() => addWordToList()('some')).toThrow()
  })

  it('returns a warning message if no word has been inserted', () => {
    expect(addWordToList('someUniqueId')()).toStrictEqual({ msg: 'No Word Added' })
  })

  it('calls translateWord with the right argument', () => {
    addWordToList('someUniqueId')('ciao');
    expect(isTranslateWordMockCalledWithArgument).toBe(true);
  })
})