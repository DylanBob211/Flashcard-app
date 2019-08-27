import React from 'react';
import { mount } from 'enzyme';
import ListForm from './ListForm';

describe('ListForm Component', () => {
  let component;
  const addNewListMock = jest.fn();
  const handleErrorMock = jest.fn();
  // const setState = jest.fn();
  // const useState = jest.spyOn(React, 'useState');
  // useState.mockImplementation(init => [init, setState]);
  beforeEach(() => {
    component = mount(<ListForm addNewList={addNewListMock} handleError={handleErrorMock} />);
    component
      .find('svg[data-test="addNewListButton"]')
      .simulate('click');
  });

  afterEach(() => {
    jest.clearAllMocks();
    component.unmount();
  });

  // while not possible to properly test useState
  it.skip('calls setIsInputting when the plusIcon is pressed', () => {
    component
      .find('svg[data-test="addNewListButton"]')
      .simulate('click');
    expect(setState).toHaveBeenCalledWith(true);
  });

  it('focuses the inputForm when plusButton is pressed', () => {
    const input = component.find('[data-test="newListTextInput"]');
    expect(input.is(':focus')).toBe(true);
  });

  it('calls handleError if no input is submitted', () => {
    component
      .find('[data-test="submitNewListButton"]')
      .simulate('submit');
    expect(addNewListMock).not.toHaveBeenCalled();
    expect(handleErrorMock).toHaveBeenCalledWith('Input a name for the list');
  });

  it('calls addNewList only if some input is submitted', () => {
    component
      .find('[data-test="newListTextInput"]')
      .simulate('change', { target: { value: 'NewList' } });
    component
      .find('[data-test="submitNewListButton"]')
      .simulate('submit');

    expect(addNewListMock).toHaveBeenCalled();
  });

  it('calls handleError with empty string when typing into the input component', () => {
    component
      .find('[data-test="newListTextInput"]')
      .simulate('change', { target: { value: 'NewList' } });

    expect(handleErrorMock).toHaveBeenCalledWith('');
  });
});
