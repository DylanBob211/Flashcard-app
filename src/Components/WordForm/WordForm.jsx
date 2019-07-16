import React, { useState } from 'react';
import './WordForm.css';


const WordForm = ({ addWord, id }) => {
  const [newWord, setNewWord] = useState('');

  const createNewList = (e) => {
    e.preventDefault();
    addWord(newWord, id);
    setNewWord('');
  };

  const handleChange = (e) => {
    setNewWord(e.target.value);
  };

  return (
    <>
      <form className="wordForm_container" onSubmit={e => createNewList(e)}>
        <AddWordInput handleChange={handleChange} newWord={newWord} />
        <AddWordBtn />
      </form>
    </>
  );
};


export default WordForm;

const AddWordBtn = () => (
  <button
    className="wordForm_btn"
    type="submit"
  />
);
const AddWordInput = ({ handleChange, newWord }) => (
  <input
    className="wordForm_input"
    type="text"
    onChange={e => handleChange(e)}
    value={newWord}
    placeholder="Add word here..."
  />
);
