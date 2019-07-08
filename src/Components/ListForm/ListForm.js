import React, {useState} from 'react'
import './ListForm.css'

const ListForm = ({addNewList}) => {
    const [newList, setNewList] = useState({
        parole: [],
        name : ''
    })

    const createNewList = (e) => {
        e.preventDefault();
        addNewList(newList)
        setNewList({name : ''})
    }

    const handleChange = e => {
        setNewList({parole : [], name : e.target.value})
        
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

