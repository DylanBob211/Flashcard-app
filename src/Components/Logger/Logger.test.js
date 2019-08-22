import React from 'react';
import { mount } from 'enzyme';
import Logger from './Logger';

describe('Logger Component With First Card Rendered', () => {
  let component;
  const languages = { from: '', to: '' };
  const setLanguages = jest.fn();

  beforeEach(() => {
    component = mount(<Logger languages={languages} setLanguages={setLanguages} />);
  });

  afterEach(() => {
    component.unmount();
  });

  it('Matches to snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('selects a language and renders its name', () => {
    component
      .find('[data-test="firstLoggerScreenLanguageSelection"]')
      .simulate('change', { target: { value: 'en' } });
    expect(component.find('option[value="en"]').text()).toBe('English');
  });

  it('renders FirstCard when mounted, not SecondCard', () => {
    expect(component.contains(<h1 className="loginCard_welcome">Welcome</h1>)).toEqual(true);
    expect(component.contains(<h2 className="loginCard_order">Choose the language that you want to learn</h2>)).toEqual(false);
  });

  describe('handleFirst', () => {
    it('calls setLanguages', () => {
      component
        .find('[data-test="firstLoggerScreenLanguageSelection"]')
        .simulate('change', { target: { value: 'en' } });
      expect(setLanguages).toHaveBeenCalled();
    });
  });
});

describe('Logger Component with Second Card Rendering', () => {
  let component;
  const languages = { from: 'en', to: '' };
  const setLanguages = jest.fn();

  beforeEach(() => {
    component = mount(<Logger languages={languages} setLanguages={setLanguages} />);
    component
      .find('[data-test="firstLoggerScreenLanguageSelection"]')
      .simulate('change', { target: { value: 'en' } });
    component
      .find('[data-test="firstLoggerScreenNextButton"]')
      .simulate('click');
  });

  afterEach(() => {
    component.unmount();
    jest.clearAllMocks();
  });

  it('renders SecondCard, not FirstCard anymore', () => {
    expect(component.contains(<h1 className="loginCard_welcome">Welcome</h1>)).toEqual(false);
    expect(component.contains(<h2 className="loginCard_order">Choose the language that you want to learn</h2>)).toEqual(true);
  });

  describe('handleSecond', () => {
    it('calls setLanguages', () => {
      component
        .find('[data-test="secondLoggerScreenLanguageSelection"]')
        .simulate('change', { target: { value: 'en' } });
      expect(setLanguages).toHaveBeenCalled();
    });
    it.skip('calls setStep when pressing the GoBack button', () => {
      component
        .find('[data-test="secondLoggerScreenBackButton"]')
        .simulate('click');
      expect(setState).toHaveBeenCalled();
    });
    it('cannot change "from" key to value "it" if "it" is the value of key "to"', () => {

    });
  });
});
