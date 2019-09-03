import React from 'react';
import { mount, shallow } from 'enzyme';
import ListHeader from './ListHeader';

describe('ListHeader', () => {
  let mountedListHeader;

  const listHeader = (props, isShallow = false) => {
    const jsx = (
      <ListHeader
        {...props}
      />
    );
    if (isShallow) return shallow(jsx);
    return mount(jsx);
  };

  const props = {
    listName: '',
    deleteList: jest.fn(),
    openExerciseWindow: jest.fn(),
  };

  beforeEach(() => {
    mountedListHeader = undefined;
    jest.clearAllMocks();
  });

  it('matches to snapshot', () => {
    expect(listHeader(props, true)).toMatchSnapshot();
  });

  it('always renders a div container', () => {
    const divContainer = listHeader(props).find('.listItem_header_container');
    expect(divContainer.exists()).toEqual(true);
  });

  describe('when `listName` is passed', () => {

  });
});
