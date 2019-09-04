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
    deleteList: null,
    openExerciseWindow: null,
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

  it('always renders a TrashBinIcon component', () => {
    const trashBinIcon = listHeader(props).find('TrashBinIcon');
    expect(trashBinIcon.exists()).toEqual(true);
  });

  it('always renders a PlayIcon component', () => {
    const playIcon = listHeader(props).find('PlayIcon');
    expect(playIcon.exists()).toEqual(true);
  });

  it('does not render any title if listName prop is not passed', () => {
    const title = listHeader(props).find('.listItem_title');
    expect(title.text()).toEqual('');
  });

  it('disables the TrashBinIcon button if the deleteList prop is not passed', () => {
    const trashBinIcon = listHeader(props).find('TrashBinIcon');
    expect(trashBinIcon.props().disabled).toEqual(true);
  });

  it('disables the PlayIcon button if the deleteList prop is not passed', () => {
    const playIcon = listHeader(props).find('PlayIcon');
    expect(playIcon.props().disabled).toEqual(true);
  });

  describe('when `listName` is passed', () => {
    beforeEach(() => {
      props.listName = 'hello title';
      mountedListHeader = listHeader(props);
    });

    it('renders a title if listName prop is not passed', () => {
      const title = mountedListHeader.find('.listItem_title');
      expect(title.text()).toEqual('hello title');
    });
  });

  describe('when deleteList function prop is passed', () => {
    beforeEach(() => {
      props.listName = 'hello title';
      props.deleteList = jest.fn();
      mountedListHeader = listHeader(props);
    });

    it('enables the TrashbinIcon button', () => {
      const trashBinIcon = mountedListHeader.find('TrashBinIcon');
      expect(trashBinIcon.props().disabled).toEqual(false);
    });

    it('fires deleteList with listName passed as an argument when clicking the TrashBinIcon button', () => {
      const { deleteList, listName } = props;
      const trashBinIcon = mountedListHeader.find('TrashBinIcon');
      trashBinIcon.simulate('click');
      expect(deleteList).toHaveBeenCalledWith(listName);
    });
  });

  describe('when openExerciseWindow function prop is passed', () => {
    beforeEach(() => {
      props.listName = 'hello title';
      props.openExerciseWindow = jest.fn();
      mountedListHeader = listHeader(props);
    });

    it('enables the PlayIcon button', () => {
      const playIcon = mountedListHeader.find('PlayIcon');
      expect(playIcon.props().disabled).toEqual(false);
    });

    it('fires deleteList with listName passed as an argument when clicking the TrashBinIcon button', () => {
      const playIcon = mountedListHeader.find('PlayIcon');
      playIcon.simulate('click');
      expect(props.openExerciseWindow).toHaveBeenCalledTimes(1);
    });
  });
});
