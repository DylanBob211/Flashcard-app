import React, { useRef } from 'react';
import uuidv4 from 'uuidv4';
import PropTypes from 'prop-types';
import { useTransition, animated } from 'react-spring';
import './ListForm.css';
import PlusIcon from '../Icons/PlusIcon';
import RemoveIcon from '../Icons/RemoveIcon';

const ListForm = ({ addNewList, handleError }) => {
  const [newList, setNewList] = React.useState({
    words: [
      { url: [], word: '' },
    ],
    name: '',
    id: '',
  });
  const listNameInput = useRef(null);

  const [isInputting, setIsInputting] = React.useState(false);

  const openAddListTextInput = async () => {
    await setIsInputting(true);
    listNameInput.current.focus();
  };
  const closeAddListTextInput = () => {
    handleError('');
    setNewList(state => ({ ...state, name: '', id: '' }));
    setIsInputting(false);
  };
  const createNewList = (e) => {
    e.preventDefault();
    if (!newList.name) {
      handleError('Input a name for the list');
    } else {
      addNewList(newList);
      setNewList(state => ({ ...state, name: '', id: '' }));
      closeAddListTextInput();
    }
  };
  const handleChange = (e) => {
    e.persist();
    handleError('');
    setNewList({ id: uuidv4(), words: [], name: e.target.value });
  };

  const AnimatedPlusIcon = animated(PlusIcon);

  const transitions = useTransition(!isInputting, null, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  });

  return (
    <div className="listForm_container">
      {
      transitions.map(({ item, key, props }) => (item ? (
        <AnimatedPlusIcon
          key={`${key} btn`}
          style={props}
          onClick={openAddListTextInput}
          data-test="addNewListButton"
          className="listForm_btn listForm_btn--lg"
        />
      ) : (
        <animated.form
          key={`${key} form`}
          style={props}
          className="listForm_input-container"
          data-test="addNewListForm"
          onSubmit={e => createNewList(e)}
        >
          <input
            ref={listNameInput}
            data-test="newListTextInput"
            className="listForm_input"
            type="text"
            onChange={e => handleChange(e)}
            value={newList.name}
          />
          <RemoveIcon
            className="listForm_btn listForm_btn--remove listForm_btn--sm"
            onClick={closeAddListTextInput}
            data-test="closeNewListInputButton"
          />
          <input
            data-test="submitNewListButton"
            className="listForm_btn listForm_btn--submit listForm_btn--sm"
            type="submit"
            value=">>"
          />
        </animated.form>
      )))
      }
    </div>
  );
};

ListForm.propTypes = {
  addNewList: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
};

export default ListForm;
