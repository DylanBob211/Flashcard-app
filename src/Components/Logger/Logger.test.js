import React from 'react';
import { create } from 'react-test-renderer';
import Logger from './Logger';

describe('Logger Component', () => {
  it('Matches to snapshot', () => {
    const component = create(<Logger />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
