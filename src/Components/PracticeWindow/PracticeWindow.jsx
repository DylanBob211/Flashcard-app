import React, { useEffect, useRef } from 'react';
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
    case 'practise': return practiceWindowWrapper(ExerciseSettingsPanel, windowState.data);
    case '': return null;
    default: return null;
  }
};

PracticeWindow.propTypes = {
  windowState: PropTypes.shape({
    case: PropTypes.string,
    data: PropTypes.array || PropTypes.object, // TODO: non funziona, ma per capirci che qualcosa va fatto
  }).isRequired,
  closeExerciseWindow: PropTypes.func.isRequired,
};

export default PracticeWindow;
