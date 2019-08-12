import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import shuffle from '../../../../Actions/practiceActions/shuffle';
import compareInputs from '../../../../Actions/practiceActions/guessTheFlashcard';

const PracticeSession = ({ data }) => {
  const answerEmptyArray = Array(data.length);
  const answerInitialState = answerEmptyArray.fill({ givenAnswer: null, isRight: null });

  const [step, setStep] = useState(0);
  const [gameWords, setGameWords] = useState([{ url: '', word: '', photoNumber: 0 }]);
  const [answer, setAnswer] = useState('');
  const [answers, setAnswers] = useState(answerInitialState);
  const handleChange = (e) => {
    e.persist();
    setAnswer(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setAnswers(state => state.map((element, ind) => {
      if (step === ind) return { givenAnswer: answer, isRight: compareInputs(answer, gameWords[step].word) };
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
    arr.forEach((obj) => {
      obj.photoNumber = Math.floor(Math.random() * obj.url.length);
    });
    shuffle(arr);
    setGameWords(arr);
  }, []);

  return (
    <div>
      <img
        style={{ maxWidth: '4rem', maxHeight: '4rem' }}
        src={gameWords[step].url[gameWords[step].photoNumber]}
        alt=""
      />
      <form onSubmit={e => handleSubmit(e)}>
        <h3>{answer}</h3>
        <h3>{gameWords[step].word}</h3>
        <input
          style={{ backgroundColor: answers[step].isRight ? 'green' : 'red' }}
          type="text"
          name={gameWords[step].word}
          onChange={e => handleChange(e)}
          value={answer}
        />
        <button type="submit">Submit Answer</button>
      </form>
      <button type="button" onClick={() => goAhead()}>Vai avanti</button>
      {gameWords.map(gameElement => (
        <div
          style={{
            width: '3rem', height: '3rem', borderRadius: '50%', backgroundColor: 'black', display: 'inline',
          }}
          key={`${gameElement.photoNumber} ${gameElement.word}`}
        >
          {'oo'}
        </div>
      ))}
      <button type="button" onClick={() => goBack()}>Torna indietro</button>
    </div>
  );
};

PracticeSession.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PracticeSession;
