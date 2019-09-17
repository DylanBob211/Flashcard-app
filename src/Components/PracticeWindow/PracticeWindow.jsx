import React from 'react';
import PropTypes from 'prop-types';
import './PracticeWindow.css';
import Flashcard from './Flashcard/Flashcard';
import ExercisePanel from './ExerciseSettingsPanel/ExerciseSettingsPanel';

const PracticeWindow = ({ windowState, closeExerciseWindow }) => {
  switch (windowState.case) {
    case 'flashcard': return <Flashcard data={windowState.data} closeWindowFunction={closeExerciseWindow} />;
    case 'list': return <ExercisePanel data={windowState.data} closeWindowFunction={closeExerciseWindow} />;
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
