import React from 'react';
import { mount, shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';
import Logger from './Logger';

jest.mock('react-router-dom');

describe('Logger', () => {
  let mountedLoggerComponent;
  const props = {
    languages: {
      from: '',
      to: '',
    },
    setLanguages: jest.fn(),
  };

  const logger = ({ languages, setLanguages }, isShallow = false) => {
    if (isShallow) {
      return shallow(
        <Logger
          languages={languages}
          setLanguages={setLanguages}
        />,
      );
    }
    return mount(
      <Logger
        languages={languages}
        setLanguages={setLanguages}
      />,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mountedLoggerComponent = undefined;
  });

  describe('Logger Component With First Card Rendered', () => {
    beforeEach(() => {
      mountedLoggerComponent = logger(props);
    });

    it('Matches to snapshot', () => {
      expect(mountedLoggerComponent).toMatchSnapshot();
    });

    it('renders FirstCard when mounted, not SecondCard', () => {
      const firstCard = mountedLoggerComponent
        .find('[data-test="firstCardWrapper"]');
      const secondCard = mountedLoggerComponent
        .find('[data-test="secondCardWrapper"]');

      expect(firstCard.exists()).toEqual(true);
      expect(secondCard.exists()).toEqual(false);
    });

    it('calls setLanguages when selecting a language', () => {
      const selectLanguage = mountedLoggerComponent
        .find('[data-test="firstLoggerScreenLanguageSelection"]');
      selectLanguage.simulate('change', { target: { value: 'en' } });
      expect(props.setLanguages).toHaveBeenCalled();
    });

    it('cannot press the button Next if no value for prop languages.from is selected', () => {
      const buttonNext = mountedLoggerComponent
        .find('[data-test="firstLoggerScreenNextButton"]');
      const secondCard = mountedLoggerComponent
        .find('[data-test="secondCardWrapper"]');
      buttonNext.simulate('click');
      expect(buttonNext.props().disabled).toEqual(true);
      expect(secondCard.exists()).toEqual(false);
    });
  });

  describe('Logger Component with "from" props inputted', () => {
    beforeEach(() => {
      props.languages.from = 'en';
      mountedLoggerComponent = logger(props);
    });
    it('enables the Next button to be pressed', () => {
      const buttonNext = mountedLoggerComponent
        .find('[data-test="firstLoggerScreenNextButton"]');
      expect(buttonNext.props().disabled).toEqual(false);
    });
  });

  describe('Logger Component with Second Card Rendering', () => {
    beforeEach(() => {
      props.languages.from = 'en';
      mountedLoggerComponent = logger(props);
      const buttonNext = mountedLoggerComponent
        .find('[data-test="firstLoggerScreenNextButton"]');
      buttonNext.simulate('click');
    });

    it('renders SecondCard, not FirstCard anymore', () => {
      const secondCard = mountedLoggerComponent
        .find('[data-test="secondCardWrapper"]');
      const firstCard = mountedLoggerComponent
        .find('[data-test="firstCardWrapper"]');
      expect(secondCard.exists()).toEqual(true);
      expect(firstCard.exists()).toEqual(false);
    });

    it('disables Start! button', () => {
      const startButton = mountedLoggerComponent
        .find('[data-test="secondLoggerScreenNextButton"]');
      expect(startButton.props().disabled).toEqual(true);
    });

    it('goes back to the first card if "Back" button is pressed', () => {
      const secondCard = mountedLoggerComponent
        .find('[data-test="secondCardWrapper"]');
      const backButton = mountedLoggerComponent
        .find('[data-test="secondLoggerScreenBackButton"]');
      expect(secondCard.exists()).toEqual(true);
      backButton.simulate('click');
      const firstCard = mountedLoggerComponent
        .find('[data-test="firstCardWrapper"]');
      expect(firstCard.exists()).toEqual(true);
    });

    it('cannot press the button if no language for the "to" key has been inserted', () => {
      const secondCard = mountedLoggerComponent
        .find('[data-test="secondCardWrapper"]');
      const nextButton = mountedLoggerComponent
        .find('[data-test="secondLoggerScreenNextButton"]');
      nextButton.simulate('click');
      expect(secondCard.exists()).toEqual(true);
    });

    it('calls setLanguages when selecting a language', () => {
      const selectLanguage = mountedLoggerComponent
        .find('[data-test="secondLoggerScreenLanguageSelection"]');
      selectLanguage.simulate('change', { target: { value: 'en' } });
      expect(props.setLanguages).toHaveBeenCalled();
    });
  });

  describe('Logger SecondCard with language props inserted', () => {
    beforeEach(() => {
      props.languages = { from: 'en', to: 'it' };
      mountedLoggerComponent = logger(props);
      const buttonNext = mountedLoggerComponent
        .find('[data-test="firstLoggerScreenNextButton"]');
      buttonNext.simulate('click');
    });

    it('enables Start! button', () => {
      const startButton = mountedLoggerComponent
        .find('[data-test="secondLoggerScreenNextButton"]');
      expect(startButton.props().disabled).toEqual(false);
    });

    it('renders Redirect component when Start! button is pressed', () => {
      Redirect.mockReturnValue(<div data-test="redirect" />);
      const startButton = mountedLoggerComponent
        .find('[data-test="secondLoggerScreenNextButton"]');
      startButton.simulate('click');

      expect(mountedLoggerComponent.contains(<div data-test="redirect" />)).toEqual(true);
    });
  });
});
