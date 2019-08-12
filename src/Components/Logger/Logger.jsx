import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Logger.css';


const Logger = () => {
  const [step, setStep] = useState(1);
  const [langValue, setLangValue] = useState({ from: '', to: '' });

  const handleFirst = (e) => {
    e.persist();
    setLangValue(state => ({ ...state, from: e.target.value }));
  };
  const handleSecond = (e) => {
    e.persist();
    setLangValue(state => ({ ...state, to: e.target.value }));
  };

  useEffect(() => {
    console.log(langValue);
  }, [langValue]);

  const nextStep = () => setStep(() => step + 1);

  const prevStep = () => setStep(() => step - 1);

  switch (step) {
    case 1: return <FirstCard langValue={langValue} next={nextStep} handleFirst={handleFirst} />;
    case 2: return <SecondCard langValue={langValue} prev={prevStep} handleSecond={handleSecond} />;
    default: return <FirstCard />;
  }
};

export default Logger;

const FirstCard = ({ next, handleFirst, langValue }) => (
  <div className="loginCard_container">
    <h1 className="loginCard_welcome">Welcome</h1>
    <h2 className="loginCard_order">Choose your mother tongue</h2>
    <form className="loginCard_form">
      <select
        value={langValue.from}
        className="loginCard_select"
        onChange={e => handleFirst(e)}
      >
        <option disabled value="" />
        <option disabled={langValue.to === 'en'} value="en">English</option>
        <option disabled={langValue.to === 'it'} value="it">Italian</option>
        <option disabled={langValue.to === 'ru'} value="ru">Russian</option>
      </select>
      <button
        disabled={!langValue.from}
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

const SecondCard = ({ prev, handleSecond, langValue }) => {
  const goAhead = (e) => {
    e.preventDefault();
    // TODO: submit result
    window.location.assign('/main');
  };
  return (
    <div className="loginCard_container">
      <h2 className="loginCard_order">Choose the language that you want to learn</h2>
      <form className="loginCard_form">
        <select
          value={langValue.to}
          className="loginCard_select"
          onChange={e => handleSecond(e)}
        >
          <option disabled value="" />
          <option disabled={langValue.from === 'en'} value="en">English</option>
          <option disabled={langValue.from === 'it'} value="it">Italian</option>
          <option disabled={langValue.from === 'ru'} value="ru">Russian</option>
        </select>
        <button type="button" className="loginCard_button loginCard_button--secondary" onClick={e => prev()}>Go back</button>
        <button
          disabled={!langValue.to}
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
