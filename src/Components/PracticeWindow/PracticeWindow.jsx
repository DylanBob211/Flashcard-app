import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useOutsideClick from '../../Hooks/useOutsideHandler';
import './PracticeWindow.css';
import Flashcard from './Flashcard/Flashcard';
import ExerciseSettingsPanel from './ExerciseSettingsPanel/ExerciseSettingsPanel';

const PracticeWindow = ({ windowState, closeExerciseWindow }) => {
  const refWrapper = useRef(null);
  useOutsideClick(refWrapper, closeExerciseWindow);

  return (
    windowState.case && (
      <div
        ref={refWrapper}
        className="practiceWindow_container"
      >
        {(function renderSwitch() {
          switch (windowState.case) {
            case 'flashcard': return <Flashcard data={windowState.data} />;
            case 'list': return <ExerciseSettingsPanel data={windowState.data} />;
            default: return null;
          }
        }())}
      </div>
    )
  );
};

PracticeWindow.propTypes = {
  windowState: PropTypes.shape({
    case: PropTypes.oneOf(['', 'flashcard', 'list']),
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  }),
  closeExerciseWindow: PropTypes.func.isRequired,
};

PracticeWindow.defaultProps = {
  windowState: { case: '', data: [] },
};

export default PracticeWindow;
