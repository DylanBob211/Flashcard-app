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

  const FirstCard = () => (
    <div className="loginCard_container">
      <h1 className="loginCard_welcome">Welcome</h1>
      <h2 className="loginCard_order">Choose your mother tongue</h2>
      <div className="loginCard_form">
        <select
          value={languages.from}
          data-test="firstLoggerScreenLanguageSelection"
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

  const SecondCard = () => (
    redirect
      ? <Redirect to="/main" />
      : (
        <div className="loginCard_container">
          <h2 className="loginCard_order">Choose the language that you want to learn</h2>
          <div className="loginCard_form">
            <select
              value={languages.to}
              data-test="secondLoggerScreenLanguageSelection"
              className="loginCard_select"
              onChange={e => handleSecond(e)}
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
              onClick={() => setRedirect(true)}
              type="button"
            >
            Continue
            </button>
          </div>
        </div>
      )
  );

  switch (step) {
    case 1: return <FirstCard />;
    case 2: return <SecondCard />;
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
