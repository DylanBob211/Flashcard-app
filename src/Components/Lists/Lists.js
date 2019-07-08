import React, {useState} from 'react'
import ListItem from '../ListItem'
import './Lists.css'

const Lists = ({lists}) => {
    
    return (
        <div className="lists">
            {lists.map((listItem, index) => (
                <ListItem key={ index } listName={ listItem.name } wordsArray={ listItem.parole } />                
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


