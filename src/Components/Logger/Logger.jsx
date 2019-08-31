import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Logger.css';


const Logger = ({ languages, setLanguages }) => {
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    e.persist();
    setLanguages(state => ({ ...state, [e.target.name]: e.target.value }));
  };

  const firstCard = () => (
    <div
      data-test="firstCardWrapper"
      className="loginCard_container"
    >
      <h1 className="loginCard_welcome">Welcome</h1>
      <h2 className="loginCard_order">Choose your mother tongue</h2>
      <div className="loginCard_form">
        <select
          value={languages.from}
          data-test="firstLoggerScreenLanguageSelection"
          className="loginCard_select"
          name="from"
          onChange={e => handleChange(e)}
        >
          <option disabled value="" />
          <option disabled={languages.to === 'en'} value="en">English</option>
          <option disabled={languages.to === 'it'} value="it">Italian</option>
          <option disabled={languages.to === 'ru'} value="ru">Russian</option>
        </select>
        <button
          disabled={!languages.from}
          data-test="firstLoggerScreenNextButton"
          type="button"
          className="loginCard_button loginCard_button--primary"
          onClick={() => setStep(() => step + 1)}
        >
          Continue
        </button>
      </div>
    </div>
  );

  const secondCard = () => (
    <div
      className="loginCard_container"
      data-test="secondCardWrapper"
    >
      <h2 className="loginCard_order">Choose the language that you want to learn</h2>
      <div className="loginCard_form">
        <select
          value={languages.to}
          data-test="secondLoggerScreenLanguageSelection"
          className="loginCard_select"
          name="to"
          onChange={e => handleChange(e)}
        >
          <option disabled value="" />
          <option disabled={languages.from === 'en'} value="en">English</option>
          <option disabled={languages.from === 'it'} value="it">Italian</option>
          <option disabled={languages.from === 'ru'} value="ru">Russian</option>
        </select>
        <button
          type="button"
          className="loginCard_button loginCard_button--secondary"
          onClick={() => setStep(() => step - 1)}
          data-test="secondLoggerScreenBackButton"
        >
        Go back
        </button>
        <button
          disabled={!languages.to}
          data-test="secondLoggerScreenNextButton"
          className="loginCard_button loginCard_button--primary"
          onClick={() => setStep(() => step + 1)}
          type="button"
        >
        Start!
        </button>
      </div>
    </div>
  );

  switch (step) {
    case 1: return firstCard();
    case 2: return secondCard();
    case 3: return <Redirect to="/main" />;
    default: return firstCard();
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


