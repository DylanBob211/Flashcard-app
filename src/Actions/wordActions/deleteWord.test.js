/* eslint-disable */
import deleteWordFactory from './deleteWord';

const initialState = [
  { id: 'someUniqueIdString', name: 'Rifiuti', words: [{ word: 'secchio della spazzatura', url: ['No Img Available'] }, { word: 'discarica', url: ['No Img Available'] }] },
  { id: 'anotherUniqueIdString', name: 'Cibo', words: [{ word: 'pizza', url: ['No Img Available'] }, { word: 'insalata', url: ['No Img Available'] }] },
]

describe('deleteWord with deps injected', () => {
  let setState;
  let deleteWord;
  beforeEach(() => {
    setState = jest.fn(state => initialState);
    deleteWord = deleteWordFactory(setState);
  })

  it('throws an error if no Word has been passed', () => {
    expect(() => deleteWord('someUniqueId')()).toThrow()
  })

  it('throws an error if no Id has been passed', () => {
    expect(() => deleteWord()('papero')).toThrow()
  })

})

