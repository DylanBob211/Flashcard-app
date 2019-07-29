import React from 'react';
import { create } from 'react-test-renderer';
import ListForm from './ListForm';

const addNewList = jest.fn();

describe('ListForm Component', () => {
  it('Matches to snapshot', () => {
    const component = create(<ListForm addNewList={addNewList} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
