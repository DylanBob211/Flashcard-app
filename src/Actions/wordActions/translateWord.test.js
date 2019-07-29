/* eslint-disable */
import translateWordFactory from './translateWord.factory'

// mocking deps

let isAxiosMockPostMethodCalled = false;  
const AxiosMock = function() {
    
  this.post = function(url, { word }) {

    isAxiosMockPostMethodCalled = true;
    
    expect(url).toBe('http://localhost:5000/')
    expect(typeof word).toBe('string')
    
    return new Promise(resolve => {
      const resolution = {
        data : {
          code: 200,
          lang: 'it-en',
          text: ['hello']
        }
      }
      resolve(resolution)
    })
  }
}

describe('translateWord', () => {
  let deps;
  let translateWord;
  beforeEach(() => {
    deps = {
      axios: new AxiosMock()
    }
    translateWord = translateWordFactory(deps)
  })

  it('sends warning message if word not specified', () => 
    translateWord().then(res => expect(res).toMatchObject({ msg: "No Word Inserted"}))
  )

  it.skip('rejects if langpair is not specified', () => 
    translateWord('word').catch(res => expect(res).toBe('No Language Pair Specified'))
  )

  it('calls axios correctly', () => {
    
    return translateWord('ciao')
      .then(res => {
        expect(res).toBe('hello')
        expect(isAxiosMockPostMethodCalled).toBe(true);
    })
  })

})