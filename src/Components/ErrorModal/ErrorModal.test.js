import React from 'react';
import { mount, shallow } from 'enzyme';
import ErrorModal from './ErrorModal';

describe('ErrorModal', () => {
  let mountedErrorModal;

  const props = {
    text: '',
  };
  const errorModal = ({ text }, isShallow = false) => {
    if (isShallow) return shallow(<ErrorModal text={text} />);
    return mount(<ErrorModal text={text} />);
  };

  beforeEach(() => {
    mountedErrorModal = undefined;
  });

  it('matches to snapshot', () => {
    expect(errorModal(props, true)).toMatchSnapshot();
  });

  it('renders null if text prop is not passed', () => {
    mountedErrorModal = errorModal(props);
    expect(mountedErrorModal.isEmptyRender()).toBeTruthy();
  });

  it('renders markup with the text prop when it is passed', () => {
    props.text = 'hello Error';
    mountedErrorModal = errorModal(props);
    expect(mountedErrorModal.text()).toEqual('hello Error');
  });
});
