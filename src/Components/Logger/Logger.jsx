import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Logger.css';


const Logger = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(() => step + 1);

  const prevStep = () => setStep(() => step - 1);

  switch (step) {
    case 1: return <FirstCard next={nextStep} />;
    case 2: return <SecondCard prev={prevStep} />;
    default: return <FirstCard />;
  }
};

export default Logger;

const FirstCard = ({ next }) => (
  <div className="loginCard_container">
    <h1 className="loginCard_welcome">Welcome</h1>
    <h2 className="loginCard_order">Choose your mother tongue</h2>
    <form form className="loginCard_form">
      <select className="loginCard_select">
        <option>bla</option>
        <option>qua</option>
        <option>dia</option>
      </select>
      <button
        className="loginCard_button loginCard_button--primary"
        onClick={e => next()}
      >
          Continue
      </button>
    </form>
  </div>
);

FirstCard.propTypes = {
  next: PropTypes.func.isRequired,
};

const SecondCard = ({ prev }) => {
  const goAhead = (e) => {
    e.preventDefault();
    // TODO: submit result
    window.location.assign('/main');
  };
  return (
    <div className="loginCard_container">
      <h2 className="loginCard_order">Choose the language that you want to learn</h2>
      <form className="loginCard_form">
        <select className="loginCard_select">
          <option>bla</option>
          <option>qua</option>
          <option>dia</option>
        </select>
        <button className="loginCard_button loginCard_button--secondary" onClick={e => prev()}>Go back</button>
        <button className="loginCard_button loginCard_button--primary" onClick={e => goAhead(e)} type="submit">Continue</button>
      </form>
    </div>
  );
};

SecondCard.propTypes = {
  prev: PropTypes.func.isRequired,
};