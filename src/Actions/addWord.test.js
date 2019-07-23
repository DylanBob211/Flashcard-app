/* eslint-disable */
import { addWord } from './wordActions';

describe('addWord', () => {
  it('rejects if no Word is inputted', () => {
    expect(addWord(null, null, null)).toStrictEqual({msg: 'No Word Added'})
  })

  // it('creates an empty object', () => {
  //   expect(addWord(word, null, null)).t
  // })
})