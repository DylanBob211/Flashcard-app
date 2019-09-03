import React from 'react';
import { mount, shallow } from 'enzyme';
import ListItem from './ListItem';

// What does it render?
// It Always renders a div container
// It Always renders a ListHeader component
// It Always renders a WordForm component

// Does my component render different things under different circumstances?
// It renders a WordItem components for each element in the wordsArray prop

// When i pass a function as a prop, what does my component use it for?
// Does it call it, or just give it to another component
// If it calls it, what does it call it with?

// It calls the deleteWord function prop with listId prop as an argument
// It passes the result to the WordItem component

// It calls the openFlashcard function prop with listId prop as an argument
// It passes the result to the WordItem component

// It calls the openExerciseWindow function prop with listId prop as an argument
// It passes the result to the ListHeader sub-component

// It calls the openFlashcard function prop with listId prop as an argument
// It passes the result to the WordForm component

// It passes the listname prop to the ListHeader component
// It passes the deleteList function prop to the ListHeader

// When the user interacts with my component, what happens?
// no public api

describe('ListItem', () => {
  let mountedListItem;
  const listItem = (props, isShallow = false) => {
    const compJsx = (
      <ListItem
        {...props}
      />
    );
    if (isShallow) {
      return shallow(compJsx);
    }
    return mount(compJsx);
  };

  beforeEach(() => {
    mountedListItem = undefined;
    jest.clearAllMocks();
  });

  describe('when wordsArray prop empty', () => {
    const propsMock = {
      listId: 'listIdMock',
      wordsArray: [],
      listName: 'listNameMock',
      deleteList: jest.fn(),
      addWord: jest.fn(),
      deleteWord: jest.fn(),
      openFlashcard: jest.fn(),
      openExerciseWindow: jest.fn(),
    };

    beforeEach(() => {
      propsMock.addWord.mockReturnValue(() => {});
      propsMock.openExerciseWindow.mockReturnValue(() => {});
      propsMock.deleteWord.mockReturnValue(() => {});
      propsMock.openFlashcard.mockReturnValue(() => {});
      mountedListItem = listItem(propsMock);
    });

    it('matches the snapshot', () => {
      const snapshotComp = listItem(propsMock, true);
      expect(snapshotComp).toMatchSnapshot();
    });

    it('always renders a div container', () => {
      const divContainer = mountedListItem.find('[data-test="listItemContainer"]');
      expect(divContainer.exists()).toEqual(true);
    });

    it('always renders a ListHeader component', () => {
      const listHeader = mountedListItem.find('ListHeader');
      expect(listHeader.exists()).toEqual(true);
    });

    it('always renders a WordForm', () => {
      const wordForm = mountedListItem.find('WordForm');
      expect(wordForm.exists()).toEqual(true);
    });

    it('curries the openExerciseWindow prop with the listId', () => {
      const { openExerciseWindow, listId } = propsMock;
      expect(openExerciseWindow).toHaveBeenCalledWith(listId);
    });

    it('passes it the curried openExerciseWindow to the ListHeader component', () => {
      const listHeader = mountedListItem.find('ListHeader');
      const { openExerciseWindow, listId } = propsMock;
      const curried = openExerciseWindow(listId);
      expect(listHeader.props().openExerciseWindow).toEqual(curried);
    });

    it('curries the addWord prop with the listId', () => {
      const { addWord, listId } = propsMock;
      expect(addWord).toHaveBeenCalledWith(listId);
    });

    it('passes it the curried addWord to the WordForm component', () => {
      const wordForm = mountedListItem.find('WordForm');
      const { addWord, listId } = propsMock;
      const curried = addWord(listId);
      expect(wordForm.props().addWord).toEqual(curried);
    });
  });

  describe('when wordsArray prop has elements', () => {
    const wordsArray = [
      { word: 'hello', url: ['helloUrl'] },
      { word: 'word', url: ['wordUrl'] },
    ];

    const propsMock = {
      listId: 'listIdMock',
      wordsArray,
      listName: 'listNameMock',
      deleteList: jest.fn(),
      addWord: jest.fn(),
      deleteWord: jest.fn(),
      openFlashcard: jest.fn(),
      openExerciseWindow: jest.fn(),
    };

    beforeEach(() => {
      propsMock.addWord.mockReturnValue(() => {});
      propsMock.openExerciseWindow.mockReturnValue(() => {});
      propsMock.deleteWord.mockReturnValue(() => {});
      propsMock.openFlashcard.mockReturnValue(() => {});
      mountedListItem = listItem(propsMock);
    });

    it('curries the deleteWord prop with the listId', () => {
      const { deleteWord, listId } = propsMock;
      expect(deleteWord).toHaveBeenCalledWith(listId);
    });

    it('passes it the curried deleteWord to the WordItem component', () => {
      const wordItem = mountedListItem.find('WordItem');
      const { deleteWord, listId } = propsMock;
      const curried = deleteWord(listId);
      expect(wordItem.first().props().deleteWord).toEqual(curried);
    });

    it('curries the openFlashcard prop with the listId', () => {
      const { openFlashcard, listId } = propsMock;
      expect(openFlashcard).toHaveBeenCalledWith(listId);
    });

    it('passes it the curried openFlashcard to the WordItem component', () => {
      const wordItem = mountedListItem.find('WordItem');
      const { openFlashcard, listId } = propsMock;
      const curried = openFlashcard(listId);
      expect(wordItem.first().props().openFlashcard).toEqual(curried);
    });

  });
});
