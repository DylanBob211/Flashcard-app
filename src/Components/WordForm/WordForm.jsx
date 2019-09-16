import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './WordForm.css';
import { useErrorContext } from '../../Contexts/ErrorContext';
import PlusIcon from '../Icons/PlusIcon';


const WordForm = ({ addWord }) => {
  const [, handleError] = useErrorContext();
  const [newWord, setNewWord] = useState('');

  const createNewWord = (e) => {
    e.preventDefault();
    if (!newWord) {
      handleError('Add a word first');
    }
    addWord(newWord, 'it')
      .catch(error => console.error(error.message));

    setNewWord('');
  };

  const handleChange = (e) => {
    e.persist();
    handleError('');
    setNewWord(e.target.value);
  };

  return (
    <form
      className="wordForm_container hide-submit"
      onSubmit={e => createNewWord(e)}
    >
      <input
        className="wordForm_input"
        type="text"
        onChange={e => handleChange(e)}
        value={newWord}
        placeholder="Add word here..."
      />
      <label data-test="addWordButtonTest">
        <input type="submit" />
        <PlusIcon
          disabled={!addWord}
        />
      </label>
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
