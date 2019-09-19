import React from 'react';
import { mount, shallow } from 'enzyme';

export default function testWrapper(Component, props, isShallow = false) {
  const jsx = (<Component {...props} />);
  if (isShallow) return shallow(jsx);
  return mount(jsx);
}
