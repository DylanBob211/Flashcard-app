import React from 'react';
import { mount, shallow } from 'enzyme';
import * as ErrorContext from '../../Contexts/ErrorContext';
import WordForm from './WordForm';

describe('WordForm Component', () => {
  const handleError = jest.fn();
  const useErrorContext = jest.spyOn(ErrorContext, 'useErrorContext');
  useErrorContext.mockImplementation(() => [null, handleError]);

  let mountedWordForm;

  const wordForm = (props, isShallow = false) => {
    const jsx = (<WordForm {...props} />);
    if (isShallow) return shallow(jsx);
    return mount(jsx);
  };

  const props = {
    addWord: null,
  };

  beforeEach(() => {
    mountedWordForm = undefined;
    jest.clearAllMocks();
  });

  it('Matches to snapshot', () => {
    const component = wordForm(props, true);
    expect(component).toMatchSnapshot();
  });

  describe('always', () => {
    beforeEach(() => {
      mountedWordForm = wordForm(props);
    });

    it('renders a form container', () => {
      const formContainer = mountedWordForm.find('.wordForm_container');
      expect(formContainer.exists()).toEqual(true);
    });

    it('renders an input', () => {
      const addWordInput = mountedWordForm.find('input.wordForm_input');
      expect(addWordInput.exists()).toEqual(true);
    });

    it('renders a PlusIcon button', () => {
      const plusIcon = mountedWordForm.find('PlusIcon');
      expect(plusIcon.exists()).toEqual(true);
    });

    it('disables the button if no addWord prop is passed', () => {
      const plusIcon = mountedWordForm.find('PlusIcon');
      expect(plusIcon.props().disabled).toEqual(true);
    });
  });

  describe('when `addWord` is passed', () => {
    beforeEach(() => {
      props.addWord = jest.fn();
      mountedWordForm = wordForm(props);
    });

    it('enables the the button', () => {
      const plusIcon = mountedWordForm.find('PlusIcon');
      expect(plusIcon.props().disabled).toEqual(false);
    });

    it('calls handleError with "Add a word first" if form is submitted', () => {
      const plusIcon = mountedWordForm.find('PlusIcon');
      plusIcon.simulate('submit');
      expect(handleError).toHaveBeenCalledWith('Add a word first');
    });

    describe('when inputting', () => {
      const testInput = 'Hello Input';
      beforeEach(() => {
        const input = mountedWordForm.find('.wordForm_input');
        input.simulate('change', { target: { value: testInput } });
      });

      it('calls handleError with empty string inputting', () => {
        expect(handleError).toHaveBeenCalledWith('');
      });

      it('changes the value of the input', () => {
        const input = mountedWordForm.find('.wordForm_input');
        expect(input.props().value).toEqual(testInput);
      });

      describe('when submitting', () => {
        beforeEach(() => {
          const plusIcon = mountedWordForm.find('PlusIcon');
          plusIcon.simulate('submit');
        });

        it('calls addWord with the input inserted', () => {
          expect(props.addWord).toHaveBeenCalledWith(testInput);
        });

        it('empties the input', () => {
          const input = mountedWordForm.find('.wordForm_input');
          expect(input.props().value).toEqual('');
        });
      });
    });
  });
});
