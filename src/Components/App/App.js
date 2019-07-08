import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import './App.css';
import FlashcardApp from '../FlashcardApp'
import Logger from '../Logger'


function App() {

 
  
  return (
    <Router>
    <div className="App">
        <Route path='/' exact render={() => (
          <Redirect to='/login' />
        )}/>
        <Route path='/main' exact component={FlashcardApp}></Route>
        <Route path='/login' exact component= {Logger}>
        </Route>
    </div>
    </Router>
  );
}

export default App;
