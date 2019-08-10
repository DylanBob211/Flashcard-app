import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import shuffle from '../../../../Actions/practiceActions/shuffle';
import compareInputs from '../../../../Actions/practiceActions/guessTheFlashcard';

const PracticeSession = ({ data }) => {
  const answerEmptyArray = Array(data.length);
  const answerInitialState = answerEmptyArray.fill({ givenAnswer: null, isRight: null });

  const [step, setStep] = useState(0);
  const [gameWords, setGameWords] = useState([{ url: '', word: '' }]);
  const [answer, setAnswer] = useState('');
  const [answers, setAnswers] = useState(answerInitialState);
  const handleChange = (e) => {
    e.persist();
    setAnswer(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setAnswers(state => state.map((element, ind) => {
      if (step === ind) return { givenAnswer: answer, isRigth: compareInputs(answer, gameWords[step].word) };
      return element;
    }));
    setAnswer('');
  };
  const goAhead = () => {
    if (step < gameWords.length - 1) setStep(step + 1);
  };
  const goBack = () => {
    if (step > 0) setStep(step - 1);
  };
  useEffect(() => {
    const arr = Array(...data);
    shuffle(arr);
    setGameWords(arr);
    console.log(answers, step);
  }, [answers, step]);

  return (
    <div>
      <img src={gameWords[step].url[Math.floor(Math.random() * 9)]} alt="" />
      <form onSubmit={e => handleSubmit(e)}>
        <input type="text" name={gameWords[step].word} onChange={e => handleChange(e)} value={answer} />
        <button type="submit">Submit Answer</button>
      </form>
      <button type="button" onClick={() => goAhead()}>Vai avanti</button>
      <button type="button" onClick={() => goBack()}>Torna indietro</button>
    </div>
  );
};

PracticeSession.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PracticeSession;
