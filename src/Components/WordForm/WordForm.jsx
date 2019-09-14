import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './WordForm.css';
import { useErrorContext } from '../../Contexts/ErrorContext';
import PlusIcon from '../Icons/PlusIcon';


const WordForm = ({ addWord }) => {
  const [, handleError] = useErrorContext();
  const [newWord, setNewWord] = useState('');

  const createNewWord = async (e) => {
    e.preventDefault();
    if (!newWord) {
      handleError('Add a word first');
    }
    try {
      await addWord(newWord, 'it'); // TODO: remove hardcoded lang
    } catch (error) {
      console.log(error.message);
    } finally {
      setNewWord('');
    }
  };

  const handleChange = (e) => {
    e.persist();
    handleError('');
    setNewWord(e.target.value);
  };

  return (
    <form className="wordForm_container" onSubmit={e => createNewWord(e)}>
      <input
        className="wordForm_input"
        type="text"
        onChange={e => handleChange(e)}
        value={newWord}
        placeholder="Add word here..."
      />
      <PlusIcon disabled={!addWord} />
    </form>
  );
};

WordForm.propTypes = {
  addWord: PropTypes.func,
};

WordForm.defaultProps = {
  addWord: null,
};

export default WordForm;
