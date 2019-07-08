import Unsplash from 'unsplash-js'

const unsplash = new Unsplash({
    applicationId: "66c8f4bbdcd250ba88db15412fb4cf728a9a8c4db261db2a356b22a1365aa20a"
});

const addWord = (word, setWords) => {
    if(!word) {
        console.warn('Inserisci una parola')
    } else {

        const newWord = {
            word: word,
            url: ''
        }

        unsplash.search.photos(word)
            .catch(e => {
                console.log(e)
                const msg = { 
                    error : e
                }
                return JSON.stringify(msg)
            })
            .then(res => res.json())
            .catch(e => console.log(e))
            .then(res => newWord.url = res.results[0].urls.small)
            .catch(res => newWord.url = 'No Img Available')
            .then(_ => setWords(state => ([newWord, ...state])))    
    
    }
         
        
}

export default addWord