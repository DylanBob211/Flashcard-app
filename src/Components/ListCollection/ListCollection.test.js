import React from 'react';
import { mount, shallow } from 'enzyme';
import ListCollection from './ListCollection';
import ListItem from '../ListItem/ListItem';
import ListForm from '../ListForm/ListForm';

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
  let propsMock;

  const listCollection = ({ 
    deleteListMock, addWordMock, deleteWordMock, listsMock, addNewListMock,
    openFlashcardMock, openExerciseWindowMock,
  }, isShallow) => {
    if (isShallow) {
      mountedListCollection = shallow(<ListCollection
        deleteList={deleteListMock}
        addWord={addWordMock}
        deleteWord={deleteWordMock}
        lists={listsMock}
        addNewList={addNewListMock}
        openExerciseWindow={openExerciseWindowMock}
        openFlashcard={openFlashcardMock}
      />);
    } else {
      mountedListCollection = mount(<ListCollection
        deleteList={deleteListMock}
        addWord={addWordMock}
        deleteWord={deleteWordMock}
        lists={listsMock}
        addNewList={addNewListMock}
        openExerciseWindow={openExerciseWindowMock}
        openFlashcard={openFlashcardMock}
      />);
    }
  };

  beforeEach(() => {
    mountedListCollection = undefined;
    propsMock = {
      deleteListMock: jest.fn(),
      addWordMock: jest.fn(),
      deleteWordMock: jest.fn(),
      openFlashcardMock: jest.fn(),
      openExerciseWindowMock: jest.fn(),
      addNewListMock: jest.fn(),
      listsMock: [],
    };
  });

  it('always renders a div component that contains everything', () => {
    listCollection(propsMock, false);
    const divWrapper = mountedListCollection.find('[data-test="listCollectionContainer"]');
    expect(divWrapper.exists()).toEqual(true);
  });

  it('always renders a ListForm component', () => {
    listCollection(propsMock, false);
    const listForm = mountedListCollection.find('ListForm');
    expect(listForm.exists()).toEqual(true);
  });

  it('renders no ListItem if "lists" prop is an empty array', () => {
    listCollection(propsMock, false);
    expect(mountedListCollection.find('ListItem').exists()).toEqual(false);
  });

  it('renders a ListItem component if "lists" prop has a list object', () => {
    propsMock.listsMock = [
      {
        id: 'myFirstId',
        name: 'FirstListMock',
        words: [
          { word: 'firstWordMock', url: ['firstUrlOne', 'firstUrlTwo'] },
        ],
      },
    ];

    listCollection(propsMock, true);
    const listItem = mountedListCollection.find('ListItem');
    expect(listItem.exists()).toEqual(true);
  });

  it('renders a ListItem component for each "list object" in the prop "lists"', () => {
    propsMock.listsMock = [
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

    listCollection(propsMock, true);
    const listItems = mountedListCollection.find('ListItem');
    expect(listItems).toHaveLength(2);
  });
});
