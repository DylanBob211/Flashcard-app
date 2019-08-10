import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlayIcon from '../../Icons/PlayIcon';
import PracticeSession from './PracticeSession/PracticeSession';

const ExerciseSettingsPanel = ({ data }) => {
  const [practiceSession, setPracticeSession] = useState({ type: 'Guess the flashcard', data: data.words, isActive: false });
  useEffect(() => {
    console.log(practiceSession);
  }, [practiceSession]);
  const selectExerciseType = (e) => {
    e.persist();
    setPracticeSession(state => ({ ...state, type: e.target.value }));
  };
  const startPracticeSession = () => {
    setPracticeSession(state => ({ ...state, isActive: true }));
  };

  const PracticePannel = props => (
    <>
      <h2>{data.name}</h2>
      <div className="exerciseForm_btnContainer">
        <button className="exerciseForm_btn selected" type="button" onClick={e => selectExerciseType(e)} value="Guess the flashcard">Guess The Flashcard</button>
        <button className="exerciseForm_btn" type="button" onClick={e => selectExerciseType(e)} value="Translate to target">Translate To Target Language</button>
        <button className="exerciseForm_btn" type="button" onClick={e => selectExerciseType(e)} value="Translate from target">Translate From Target Language</button>
      </div>
      <PlayIcon customFunction={() => startPracticeSession()} classIcon="exerciseForm_startBtn" />
    </>
  );
  return (
    <>

      {!practiceSession.isActive
        ? <PracticePannel />
        : <PracticeSession data={practiceSession.data} />}
    </>
  );
};

ExerciseSettingsPanel.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    words: PropTypes.arrayOf(
      PropTypes.shape({
        word: PropTypes.string,
        url: PropTypes.arrayOf(PropTypes.string),
      }),
    ),
  }).isRequired,
};


export default ExerciseSettingsPanel;
