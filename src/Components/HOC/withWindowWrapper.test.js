import React from 'react';
import { mount } from 'enzyme';
import withWindowWrapper from './withWindowWrapper';
import testWrapper from '../../Helpers/testComponentMountWrapper';


describe('withWindowWrapper', () => {
  let EnhancedComponent;
  let enhancedComponentMount;
  const closeWindowFunction = jest.fn();
  const BaseComponentMock = props => <div {...props}>Hello world!</div>;

  beforeEach(() => {
    EnhancedComponent = withWindowWrapper(BaseComponentMock, closeWindowFunction);
    enhancedComponentMount = testWrapper(EnhancedComponent, { case: '', data: [] });
  });

  afterEach(() => {
    EnhancedComponent = undefined;
    enhancedComponentMount = undefined;
  });

  it('returns the base component', () => {
    expect(enhancedComponentMount.text()).toEqual('Hello world!');
  });

  it('returns a div around it', () => {
    expect(enhancedComponentMount.find('BaseComponentMock').parent().type()).toEqual('div');
  });

  it('calls the closeWindowFunction on click', () => {
    const webPageWrapper = mount(
      <div>
        <div id="sth" />
        <EnhancedComponent />
      </div>,
    );

    webPageWrapper.find('#sth').simulate('mousedown');
    expect(closeWindowFunction).toHaveBeenCalled();
  });
});
