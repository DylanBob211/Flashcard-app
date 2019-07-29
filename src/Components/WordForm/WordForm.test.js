import React from 'react';
import { create } from 'react-test-renderer';
import WordForm from './WordForm';

const addWord = jest.fn();

describe('WordForm Component', () => {
  it('Matches to snapshot', () => {
    const component = create(<WordForm addWord={addWord} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
