import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useOutsideClick from '../../Hooks/useOutsideHandler';
import './PracticeWindow.css';
import Flashcard from './Flashcard/Flashcard';
import ExerciseSettingsPanel from './ExerciseSettingsPanel/ExerciseSettingsPanel';

const PracticeWindow = ({ windowState, closeExerciseWindow }) => {
  const refWrapper = useRef(null);
  useOutsideClick(refWrapper, closeExerciseWindow);
  const practiceWindowWrapper = (Component, data) => <div ref={refWrapper} className="practiceWindow_container"><Component data={data} /></div>;

  switch (windowState.case) {
    case 'flashcard': return practiceWindowWrapper(Flashcard, windowState.data);
    case 'list': return practiceWindowWrapper(ExerciseSettingsPanel, windowState.data);
    default: return null;
  }
};

PracticeWindow.propTypes = {
  windowState: PropTypes.shape({
    case: PropTypes.string,
    data: PropTypes.array,
  }),
  closeExerciseWindow: PropTypes.func.isRequired,
};

PracticeWindow.defaultProps = {
  windowState: { case: '', data: [] },
};

export default PracticeWindow;
