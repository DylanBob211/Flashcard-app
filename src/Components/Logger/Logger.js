import React, {useEffect, useState} from 'react'
import { Redirect } from 'react-router-dom'


const Logger = props => {

    return (
        <div>
            <h1>Benvenuto nella mia flashcard App</h1>
            <h2>clicca sul pulsante per continuare</h2>
            <button onClick={e => window.location.assign('/main')}>click to continue</button>
        </div>
    )
}

export default Logger
