import React from 'react';
import { mount } from 'enzyme';
import uuidv4 from 'uuidv4';
import * as ErrorContext from '../../Contexts/ErrorContext';
import ListForm from './ListForm';

jest.mock('uuidv4');

describe('ListForm Component', () => {
  let component;
  const addNewListMock = jest.fn();
  const handleErrorMock = jest.spyOn(ErrorContext, 'useErrorContext');
  const setErrorMock = jest.fn();
  handleErrorMock.mockImplementation(() => [null, setErrorMock]);

  beforeEach(() => {
    component = mount(<ListForm addNewList={addNewListMock} />);
    component
      .find('svg[data-test="addNewListButton"]')
      .simulate('click');
  });

  afterEach(() => {
    jest.clearAllMocks();
    component.unmount();
  });

  it('renders the form when the plusIcon is pressed', () => {
    const input = component.find('[data-test="newListTextInput"]');
    expect(input.exists()).toBe(true);
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
    uuidv4.mockImplementation(() => 'mockedId');
    component
      .find('[data-test="newListTextInput"]')
      .simulate('change', { target: { value: 'NewList' } });
    component
      .find('[data-test="submitNewListButton"]')
      .simulate('submit');

    expect(addNewListMock).toHaveBeenCalledWith({
      words: [],
      name: 'NewList',
      id: 'mockedId',
    });
  });

  it('calls handleError with empty string when typing into the input component', () => {
    component
      .find('[data-test="newListTextInput"]')
      .simulate('change', { target: { value: 'NewList' } });

    expect(setErrorMock).toHaveBeenCalledWith('');
  });
});
