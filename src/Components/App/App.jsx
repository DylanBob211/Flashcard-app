import React, { useState } from 'react';
import {
  BrowserRouter as Router, Route, Redirect,
} from 'react-router-dom';
import './App.css';
import FlashcardApp from '../FlashcardApp/FlashcardApp';
import Logger from '../Logger/Logger';
import ErrorProvider from '../../Contexts/ErrorContext';
import ListProvider from '../../Contexts/ListContext'

function App() {
  const [languages, setLanguages] = useState({ from: '', to: '' });

  return (
    <ListProvider>
      <ErrorProvider>
        <Router>
          <div className="App">
            <Route
              path="/"
              exact
              render={() => (
                <Redirect to="/login" />
              )}
            />
            <Route path="/main" exact render={() => <FlashcardApp languages={languages} />} />
            <Route path="/login" exact render={() => <Logger languages={languages} setLanguages={setLanguages} />} />
          </div>
        </Router>
      </ErrorProvider>
    </ListProvider>
  );
}

export default App;
