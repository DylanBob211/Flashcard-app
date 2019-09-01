import React from 'react';
import { mount, shallow } from 'enzyme';
import * as ErrorContext from '../../Contexts/ErrorContext';
import FlashcardApp from './FlashcardApp';

// What does it render?
// It Always render a div container

// Does my component render different things under different circumstances?
// It renders ErrorModal component if a non-empty string is passed as a prop to it
// It renders a ListCollection component if a non-empty array is passed as a "lists" prop
// It renders a PracticeWindow component if an object with a field "case" equal to 'flashcard' or 'practise' is passed

// When i pass a function as a prop, what does my component use it for?
// Does it call it, or just give it to another component
// If it calls it, what does it call it with?
// It injects the setList into the actions that is going to pass to ListCollection

// When the user interacts with my component, what happens?
// no public api

describe('FlashcardApp', () => {
  let mountedFlashcardAppComponent;
  let props = {
    languages: { from: '', to: '' }
  };

  const useErrorMock = jest.spyOn(ErrorContext, 'useErrorContext');
  const setErrorMock = jest.fn();
  let errorMock;
  useErrorMock.mockImplementation(() => [errorMock, setErrorMock]);

  const flashcardApp = ({ languages }, isShallow = false) => {
    if (isShallow) {
      return shallow(
        <FlashcardApp
          languages={languages}
        />,
      );
    }
    return mount(
      <FlashcardApp
        languages={languages}
      />,
    );
  };

  beforeEach(() => {
    mountedFlashcardAppComponent = undefined;
    jest.clearAllMocks();
  });

  beforeEach(() => {
    mountedFlashcardAppComponent = flashcardApp(props);
    errorMock = 'hello error';
  });

  it('always render a div container', () => {
    const divContainer = mountedFlashcardAppComponent
      .find('[data-test="FlashcardAppContainer"]');
    expect(divContainer.exists()).toEqual(true);
  });

  it('always renders an ErrorModal component with a message if error is passed from context', () => {
    const errorModal = mountedFlashcardAppComponent
      .find('ErrorModal');
    expect(errorModal.exists()).toEqual(true);
  });

  it('passes the error text from context to the ErrorModal', () => {
    const errorModal = mountedFlashcardAppComponent
      .find('ErrorModal');
    expect(errorModal.props().text).toEqual('hello error');
  });

  it('renders a PracticeWindow component', () => {
    const practiceWindow = mountedFlashcardAppComponent
      .find('PracticeWindow');
    expect(practiceWindow.exists()).toEqual(true);
  });
});
