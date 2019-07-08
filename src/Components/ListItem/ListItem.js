import React, {useState, useEffect} from 'react'
import WordItem from '../WordItem';
import WordForm from '../WordForm'
import addWord from './addWord'
import './ListItem.css'
import TrashBinIcon from '../Icons/TrashBinIcon';
import PlayIcon from '../Icons/PlayIcon'


const ListItem = ({ wordsArray, listName}) => {
    
    const [words, setWords] = useState(wordsArray)

    const [isExpanded, setExpanded] = useState(false)

    useEffect(() => {
        console.log(words)
    }, [words])

         
    const listOfWords = words.map((word, index) => (<WordItem name={word.word} picUrl={word.url} key={index}/>))

    return (<div className="listItem_container" >
                <ListHeader listName={ listName } />
                <ul className="listItem_wordList">{ listOfWords }</ul> 
                <WordForm addWord={ addWord } dependency ={ setWords }/>
            </div>)
        
    
}

const ListHeader = ({listName}) => {
    
    return (
    <div className="listItem_header_container">
        <h2 className="listItem_title">{ listName }</h2>
        <div className="listItem_iconbox">
            <TrashBinIcon class="listItem_icon--trashbin"/>
            <PlayIcon class="listItem_icon--play" />
        </div>
    </div>
    )
}

export default ListItem