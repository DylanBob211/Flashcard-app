import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './WordForm.css';


const WordForm = ({ addWord }) => {
  const [newWord, setNewWord] = useState('');

  const createNewWord = (e) => {
    e.preventDefault();
    addWord(newWord);
    setNewWord('');
  };

  const handleChange = (e) => {
    setNewWord(e.target.value);
  };

  return (
    <>
      <form className="wordForm_container" onSubmit={e => createNewWord(e)}>
        <AddWordInput handleChange={handleChange} newWord={newWord} />
        <AddWordBtn />
      </form>
    </>
  );
};

WordForm.propTypes = {
  addWord: PropTypes.func.isRequired,
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

AddWordInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  newWord: PropTypes.string.isRequired,
};
