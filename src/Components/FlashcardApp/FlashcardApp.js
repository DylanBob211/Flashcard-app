import React, { useState } from 'react'
import Lists from '../Lists'
import ListForm from '../ListForm'


const FlashcardApp = () => {
    
    const [lists, setLists] = useState([
        {name : 'Rifiuti', parole: [{ word :'secchio della spazzatura', url : 'No Img Available' }, { word :'discarica', url : 'No Img Available' }]},
        {name : 'Cibo', parole: [{ word :'pizza', url : 'No Img Available' }, { word :'insalata', url : 'No Img Available' }]},
        {name : 'Viaggiare', parole: [{ word :'maremma', url : 'No Img Available' }, { word :'colcane', url : 'No Img Available' }]}
      ])
    
    const addNewList = (newList) => {
    setLists(state => ([...state, newList]))
    }


    return (
        <div>
            <ListForm addNewList={addNewList} />
            <Lists lists={lists}/>
        </div>
    )
}

export default FlashcardApp
