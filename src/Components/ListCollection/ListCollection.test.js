import React from 'react';
import { mount, shallow } from 'enzyme';
import ListCollection from './ListCollection';
// What does it render?
// Always renders a div with class lists_container
// Renders an array of ListItems if prop "lists" has, else not
// Always renders a ListForm Component

// Does my component render different things under different circumstances?
// If the prop "lists" has at least one list object it renders it

// When i pass a function as a prop, what does my component use it for?
// Does it call it, or just give it to another component
// If it calls it, what does it call it with?

// the "addNewList" prop is required to be passed to ListForm
// the "deleteNewList" prop is required to be passed to ListItem (if any)
// the "openFlashcard" prop is required to be passed to ListItem (if any)
// the "openExerciseWindow" prop is required to be passed to ListItem (if any)
// the "addWord" prop is required to be passed to ListItem (if any)
// the "deleteWord" prop is required to be passed to ListItem (if any)


// When the user interacts with my component, what happens?
// No user interaction

describe('ListCollection', () => {
  let mountedListCollection;
  const propsMock = {
    addWord: jest.fn(),
    deleteWord: jest.fn(),
    openFlashcard: jest.fn(),
    openExerciseWindow: jest.fn(),
    lists: [],
  };

  const listCollection = (props, isShallow) => {
    const jsx = (
      <ListCollection
        {...props}
      />
    );
    if (isShallow) {
      return shallow(jsx);
    }
    return mount(jsx);
  };

  beforeEach(() => {
    mountedListCollection = undefined;
    mountedListCollection = listCollection(propsMock, false);
  });

  it('always renders a div component that contains everything', () => {
    const divWrapper = mountedListCollection.find('[data-test="listCollectionContainer"]');
    expect(divWrapper.exists()).toEqual(true);
  });

  it('always renders a ListForm component', () => {
    const listForm = mountedListCollection.find('ListForm');
    expect(listForm.exists()).toEqual(true);
  });

  it('renders no ListItem if "lists" prop is an empty array', () => {
    listCollection(propsMock, false);
    expect(mountedListCollection.find('ListItem').exists()).toEqual(false);
  });

  describe('when lists is not empty', () => {
    let listItem;

    const listArray = [
      {
        id: 'myFirstId',
        name: 'FirstListMock',
        words: [
          { word: 'firstWordMock', url: ['firstUrlOne', 'firstUrlTwo'] },
        ],
      },
      {
        id: 'mySecondId',
        name: 'SecondListMock',
        words: [
          { word: 'secondWordMock', url: ['secondUrlOne', 'secondUrlTwo'] },
        ],
      },
    ];

    const propsSecondMock = {
      addWord: jest.fn(),
      deleteWord: jest.fn(),
      openFlashcard: jest.fn(),
      openExerciseWindow: jest.fn(),
      lists: listArray,
    };

    beforeEach(() => {
      mountedListCollection = listCollection(propsSecondMock, true);
      listItem = mountedListCollection.find('ListItem');
    });

    it('renders a ListItem component', () => {
      expect(listItem.exists()).toEqual(true);
    });

    it('renders a ListItem component for each "list object" in the prop "lists"', () => {
      expect(listItem).toHaveLength(2);
    });

    it('passes the "openFlashcard" prop to ListItem component', () => {
      expect(listItem.first().props().openFlashcard).toEqual(propsSecondMock.openFlashcard);
    });

    it('passes the "openExerciseWindow" prop to ListItem component', () => {
      expect(listItem.first().props().openExerciseWindow).toEqual(propsSecondMock.openExerciseWindow);
    });
  });
});
