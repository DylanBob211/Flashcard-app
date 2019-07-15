import React, { useState, useEffect } from 'react'
import { addNewList as addNewListDependent, deleteList as deleteListDependent} from '../../Actions/listActions' 
import { addWord as addWordDependent , deleteWord as deleteWordDependent } from '../../Actions/wordActions'
import Lists from '../Lists'
import ListForm from '../ListForm'


const FlashcardApp = () => {
    
    
    const [lists, setLists] = useState([
        {name : 'Rifiuti', words: [{ word :'secchio della spazzatura', url : 'No Img Available' }, { word :'discarica', url : 'No Img Available' }]},
        {name : 'Cibo', words: [{ word :'pizza', url : 'No Img Available' }, { word :'insalata', url : 'No Img Available' }]},
        {name : 'Viaggiare', words: [{ word :'maremma', url : 'No Img Available' }, { word :'colcane', url : 'No Img Available' }]}
    ])
    
    useEffect(()=> {
        console.log(lists)
    }, [lists])

    /*word Actions with dependencies injected*/
    
    const addWord = (newWord, id) => addWordDependent(newWord, setLists, id);
 
    const deleteWord = (wordName, id) => deleteWordDependent(wordName, setLists, id)

    /**********************/

    /*List Actions with dependencies injected*/

    const addNewList = newList => addNewListDependent(newList, setLists)
    const deleteList = listName => deleteListDependent(listName, setLists)

    /*******************/
    
    return (
        <div>
            <ListForm addNewList={addNewList} />
            <Lists 
                addWord={ addWord } 
                deleteWord={ deleteWord } 
                deleteList={ deleteList } 
                lists={ lists } 
            />
        </div>
    )
}

export default FlashcardApp
