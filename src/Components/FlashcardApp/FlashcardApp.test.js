import React from 'react';
import { mount, shallow } from 'enzyme';
import * as ErrorContext from '../../Contexts/ErrorContext';
import FlashcardApp from './FlashcardApp';

describe('FlashcardApp', () => {
  let mountedFlashcardAppComponent;
  const props = {
    languages: { from: '', to: '' },
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

  it('matches the snapshot', () => {
    const snapshotComponent = flashcardApp(props, true);
    expect(snapshotComponent).toMatchSnapshot();
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
