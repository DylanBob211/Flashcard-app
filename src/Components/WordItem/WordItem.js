import React, { useState, useEffect } from 'react'
import './WordItem.css'

const WordItem = ({name, picUrl}) => {
    
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
            <WordPreview picUrl={picUrl} isMouseOver={ isMouseOver } mousePosition={ mousePosition }/>
            <li className="wordItem_li">{name}</li>        
        </div>
    )
}

export default WordItem

const WordPreview = ({ picUrl, isMouseOver, mousePosition }) => {

    const dinamicStyle = {
        position : 'absolute',
        left: `${mousePosition.mouseX}px`,
        top: `${mousePosition.mouseY}px`,
        transition: isMouseOver ? '.3s transform' : '.1s transform',
        transform: isMouseOver ? 'scale(1)' : 'scale(0)',
        transformOrigin: 'top left', 
        opacity: '0.7'
    }

    return (
    <div className="wordPreview_container" style={dinamicStyle}>
        { picUrl === "No Img Available" ? <img className="wordPreview_img" src={ require('../../Assets/imgs/abs.jpg') } alt="word preview"/> : <img className="wordPreview_img" src={ picUrl } alt="word preview" />}
    </div>
    )
}

