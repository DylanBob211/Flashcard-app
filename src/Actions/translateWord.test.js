/* eslint-disable */
import { translateWord } from './wordActions'


const emptyFunction = () => {}
emptyFunction.post = function(){}

describe('translateWord', () => {

  it('rejects if word not specified', () => 
    expect(translateWord(emptyFunction, null)).rejects.toThrow(/No/)
  )

  it.skip('rejects if langpair is not specified', () => 
    translateWord(emptyFunction, 'word').catch(res => expect(res).toBe('No Language Pair Specified'))
  )

  it('calls axios correctly', () => {
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
    const axiosMock = new AxiosMock()
    
    return translateWord(axiosMock, 'ciao')
      .then(res => {
        expect(res).toBe('hello')
        expect(isAxiosMockPostMethodCalled).toBe(true);
    })
  })

})