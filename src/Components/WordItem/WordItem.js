import React, { useState, useEffect } from 'react'
import './WordItem.css'

const WordItem = ({name, picUrls, deleteWord, id}) => {
    
    const [isMouseOver, setMouseOver] = useState(false)
    const [mousePosition, setMousePosition] = useState({mouseX : 0, mouseY: 0})

    const handleMouseOver = e => {
        setMouseOver(!isMouseOver)
    }
    const handleMouseMove = e => {
        setMousePosition({mouseX : e.clientX, mouseY: e.clientY })
    }

    return (
        <div onMouseOver={e => handleMouseOver(e)} onMouseOut={e => handleMouseOver(e)} onMouseMove={e => handleMouseMove(e)}>
            <WordPreview name={ name } picUrls={picUrls} isMouseOver={ isMouseOver } mousePosition={ mousePosition }/>
            <div className="wordItem_container">
                <li className="wordItem_name">{name}</li>
                <button className="wordItem_remove" onClick={e => deleteWord(name, id)}>-</button>        
            </div>
        </div>
    )
}

export default WordItem

const WordPreview = ({ picUrls, isMouseOver, name }) => {

    const dinamicStyle = {

        transition: isMouseOver ? '.5s all 1s' : '.3s all',
        transform: isMouseOver ? 'scaleZ(1) translate(10%, -101%)' : 'scaleZ(0) translate(10%, -101%)',
        transformOrigin: 'top',
        opacity: isMouseOver ? '0.9' : '0.2'
    }

    const renderImg = () => {
        if(picUrls === "No Img Available" || picUrls === ""){
            return <img className="wordPreview_img" src={ require('../../Assets/imgs/no_img.svg') } alt="no Word Preview"/>
        } else {
            return (
                <div className="wordPreview_imgContainer">
                    {picUrls.map((url, ind) => (<img key={ind} className="wordPreview_img--small" src={url} />))}
                </div>
            )
        }
    }

    return (
    <div className="wordPreview_container" style={dinamicStyle}>
        <h3 className="wordPreview_title">{ name }</h3>
        {renderImg()}    
    </div>
    )
}

