import React from 'react';
import { mount } from 'enzyme';
import * as ErrorContext from '../../Contexts/ErrorContext';
import ListForm from './ListForm';

describe('ListForm Component', () => {
  let component;
  const addNewListMock = jest.fn();

  const handleErrorMock = jest.spyOn(ErrorContext, 'useErrorContext');
  const setErrorMock = jest.fn();
  handleErrorMock.mockImplementation(() => [null, setErrorMock]);

  beforeEach(() => {
    jest.resetModules();
    component = mount(<ListForm addNewList={addNewListMock} />);
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
    expect(setStateMock).toHaveBeenCalledWith(true);
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
    expect(setErrorMock).toHaveBeenCalledWith('Input a name for the list');
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

    expect(setErrorMock).toHaveBeenCalledWith('');
  });
});
