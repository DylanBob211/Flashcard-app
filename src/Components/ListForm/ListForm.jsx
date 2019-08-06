import React, { useState } from 'react';
import uuidv4 from 'uuidv4';
import PropTypes from 'prop-types';
import './ListForm.css';

const ListForm = ({ addNewList, handleError }) => {
  const [newList, setNewList] = useState({
    words: [
      { url: '', word: '' },
    ],
    name: '',
    id: '',
  });

  const createNewList = (e) => {
    e.preventDefault();
    if (!newList.name) {
      handleError('Input a name for the list');
      console.error('Input a name for the list');
    } else {
      addNewList(newList);
      setNewList(state => ({ ...state, name: '', id: '' }));
    }
  };

  const handleChange = (e) => {
    handleError('');
    setNewList({ id: uuidv4(), words: [], name: e.target.value });
  };

  return (
    <>
      <form className="listForm_container" onSubmit={e => createNewList(e)}>
        <h1 className="listForm_title">Flashcard App</h1>
        <div className="listForm_input-container">
          <input className="listForm_input" type="text" onChange={e => handleChange(e)} value={newList.name} />
          <input className="listForm_btn" type="submit" value="+ Add Topic" />
        </div>
      </form>
    </>
  );
};

ListForm.propTypes = {
  addNewList: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
};

export default ListForm;
