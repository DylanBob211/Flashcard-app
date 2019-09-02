import React from 'react';
import { mount } from 'enzyme';
import ErrorModal from './ErrorModal';

describe('ErrorModal', () => {
  let mountedErrorModal;

  const props = {
    text: '',
  };
  const errorModal = ({ text }) => {
    return mount(<ErrorModal text={text} />);
  };

  beforeEach(() => {
    mountedErrorModal = undefined;
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
