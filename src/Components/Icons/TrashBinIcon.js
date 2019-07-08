import React from 'react'

const TrashBinIcon = props => {

    return (
        
        <svg className={ props.class } xmlns="http://www.w3.org/2000/svg" 
            width={ props.width ? props.width : 24 } 
            height={ props.height ? props.height : 24 } 
            viewBox="0 0 24 24"
            fill={ props.fill ? props.fill : "#000"} 
            aria-labelledby={ props.iconTitle }>
            <title id={ props.iconTitle }>TrashBin Icon</title>
            <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/>
        </svg>
    )

}

export default TrashBinIcon