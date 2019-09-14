import React from 'react';
import { mount, shallow } from 'enzyme';
import ListItem from './ListItem';
import * as ListContext from '../../Contexts/ListContext';

describe('ListItem', () => {
  const useListContext = jest.spyOn(ListContext, 'useListContext');
  const addWord = jest.fn();
  const deleteWord = jest.fn();
  const addNewList = jest.fn();
  const deleteList = jest.fn();
  useListContext.mockImplementation(() => ({
    addNewList,
    deleteList,
    addWord,
    deleteWord,
  }));

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
      deleteWord,
      openFlashcard: jest.fn(),
      openExerciseWindow: jest.fn(),
    };

    beforeEach(() => {
      addWord.mockReturnValue(() => {});
      deleteWord.mockReturnValue(() => {});
      propsMock.openExerciseWindow.mockReturnValue(() => {});
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

    it('curries `addWord` with `listId`', () => {
      const { listId } = propsMock;
      expect(addWord).toHaveBeenCalledWith(listId);
    });

    it('passes the curried `addWord` to the WordForm component', () => {
      const wordForm = mountedListItem.find('WordForm');
      const { listId } = propsMock;
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
      const { listId } = propsMock;
      expect(deleteWord).toHaveBeenCalledWith(listId);
    });

    it('passes it the curried deleteWord to the WordItem component', () => {
      const wordItem = mountedListItem.find('WordItem');
      const { listId } = propsMock;
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
