import React, { useState } from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Miss,
} from 'react-router-dom';
import './App.css';
import FlashcardApp from '../FlashcardApp/FlashcardApp';
import Logger from '../Logger/Logger';


function App() {
  return (
    <Router>
      <div className="App">
        <Route
          path="/"
          exact
          render={() => (
            <Redirect to="/login" />
          )}
        />
        <Route path="/main" exact component={FlashcardApp} />
        <Route path="/login" exact component={Logger} />
      </div>
    </Router>
  );
}

export default App;
