import React, {useState} from 'react'
import ListItem from '../ListItem'
import './Lists.css'

const Lists = ({lists, deleteList}) => {
    
    return (
        <div className="lists">
            {lists.map((listItem, index) => (
                <ListItem deleteList={deleteList} key={ index } listName={ listItem.name } wordsArray={ listItem.parole } />                
            ))}
        </div>
    )
}
// const ListStyle = {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(6, 1fr)',
//     gridGap: '.3em',
//     marginTop: '.4em'
// }



export default Lists


