import React, {useState} from 'react'
import './ListForm.css'

const ListForm = ({addNewList}) => {
    const [newList, setNewList] = useState({
        words: [
            {url : '', word: ''}
        ],
        name : ''
    })

    const createNewList = (e) => {
        e.preventDefault();
        if(!newList.name){
            console.warn('insert a name for the list')
        } else {
            addNewList(newList)
            setNewList(state => ({...state, name: ""}))
        }
        
    }

    const handleChange = e => {
        setNewList({words : [], name : e.target.value})
    }
    
    return (
        <>
            <form className="listForm_container" onSubmit={e => createNewList(e)}>
                <h1 className="listForm_title">Flashcard App</h1>
                <div className="listForm_input-container">
                    <input className="listForm_input" type="text" onChange={e => handleChange(e)} value={newList.name}></input>
                    <input className="listForm_btn" type="submit" value='+ Add Topic'></input>
                </div>
            </form>
        </>
    )
}

export default ListForm

