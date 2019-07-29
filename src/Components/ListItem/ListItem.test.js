/* eslint-disable */
import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils"; 
import ListItem from './ListItem';

configure({ adapter: new Adapter() });


/* Fake Props */
const openFlashcardMock = jest.fn();
const addWordMock = jest.fn();
const deleteWordMock = jest.fn();
const deleteListMock = jest.fn();
const listNames = ['number one', 'number two', 'number three'];
const listIDs = ['someRandomString', 'someOtherRandomString', 'anotherRandomString'];
const wordsArrayMock = [[
  { word: 'word one', url: ['https://test.com/1', 'https://test.com/2'] },
  { word: 'word two', url: ['No Img Available'] },
  { word: 'word three', url: ['https://testtwo.com/1', 'https://testtwo.com/2'] },
],
[
  { word: 'word four', url: ['https://test.com/3', 'https://test.com/4'] },
  { word: 'word five', url: ['No Img Available'] },
  { word: 'word six', url: ['https://testtwo.com/3', 'https://testtwo.com/4'] },
],
[
  { word: 'word seven', url: ['https://test.com/1', 'https://test.com/2'] },
  { word: 'word eight', url: ['No Img Available'] },
  { word: 'word nine', url: ['https://testtwo.com/5', 'https://testtwo.com/6'] },
],
];

const props = {
  id: listIDs[0],
  wordsArray: wordsArrayMock[0],
  listName: listNames[0],
  deleteList: deleteListMock,
  addWord: addWordMock,
  deleteWord: deleteWordMock,
  openFlashcard: openFlashcardMock,
}
// ///////////////////////////////////////////////////////

let container; 
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('ListItem component', () => {
  it('Shallow renders', () => {
    shallow(<ListItem {...props} />)
  });

  it('Mounts', () => {
    mount(<ListItem {...props} />)
  });
})
