import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Logger.css';


const Logger = ({ languages, setLanguages }) => {
  const [step, setStep] = useState(1);

  const handleFirst = (e) => {
    e.persist();
    setLanguages(state => ({ ...state, from: e.target.value }));
  };
  const handleSecond = (e) => {
    e.persist();
    setLanguages(state => ({ ...state, to: e.target.value }));
  };

  useEffect(() => {
    console.log(languages);
  }, [languages]);

  const nextStep = () => setStep(() => step + 1);

  const prevStep = () => setStep(() => step - 1);

  switch (step) {
    case 1: return <FirstCard languages={languages} next={nextStep} handleFirst={handleFirst} />;
    case 2: return <SecondCard languages={languages} prev={prevStep} handleSecond={handleSecond} />;
    default: return <FirstCard />;
  }
};

Logger.propTypes = {
  languages: PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string,
  }),
  setLanguages: PropTypes.func.isRequired,
};

Logger.defaultProps = {
  languages: {
    from: '',
    to: '',
  },
};

export default Logger;

const FirstCard = ({ next, handleFirst, languages }) => (
  <div className="loginCard_container">
    <h1 className="loginCard_welcome">Welcome</h1>
    <h2 className="loginCard_order">Choose your mother tongue</h2>
    <form className="loginCard_form">
      <select
        value={languages.from}
        className="loginCard_select"
        onChange={e => handleFirst(e)}
      >
        <option disabled value="" />
        <option disabled={languages.to === 'en'} value="en">English</option>
        <option disabled={languages.to === 'it'} value="it">Italian</option>
        <option disabled={languages.to === 'ru'} value="ru">Russian</option>
      </select>
      <button
        disabled={!languages.from}
        type="button"
        className="loginCard_button loginCard_button--primary"
        onClick={() => next()}
      >
        Continue
      </button>
    </form>
  </div>
);

FirstCard.propTypes = {
  next: PropTypes.func.isRequired,
};

const SecondCard = ({ prev, handleSecond, languages }) => {
  const [redirect, setRedirect] = useState(false);
  const goAhead = (e) => {
    e.preventDefault();
    // TODO: submit result
    setRedirect(true);
  };

  if (redirect) return <Redirect to="/main" />;
  return (
    <div className="loginCard_container">
      <h2 className="loginCard_order">Choose the language that you want to learn</h2>
      <form className="loginCard_form">
        <select
          value={languages.to}
          className="loginCard_select"
          onChange={e => handleSecond(e)}
        >
          <option disabled value="" />
          <option disabled={languages.from === 'en'} value="en">English</option>
          <option disabled={languages.from === 'it'} value="it">Italian</option>
          <option disabled={languages.from === 'ru'} value="ru">Russian</option>
        </select>
        <button type="button" className="loginCard_button loginCard_button--secondary" onClick={e => prev()}>Go back</button>
        <button
          disabled={!languages.to}
          className="loginCard_button loginCard_button--primary"
          onClick={e => goAhead(e)}
          type="submit"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

SecondCard.propTypes = {
  prev: PropTypes.func.isRequired,
};
