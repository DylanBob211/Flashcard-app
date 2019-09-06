import React from 'react';
import { mount, shallow } from 'enzyme';
import FlashcardPreview from './FlashcardPreview';

const noImg = require('../../../Assets/imgs/no_img.svg');

describe('FlashcardPreview', () => {
  let mountedFlashcardPreview;
  const flashcardPreview = (props, isShallow = false) => {
    const jsx = (<FlashcardPreview {...props} />);
    return isShallow ? shallow(jsx) : mount(jsx);
  };

  const props = {};

  beforeEach(() => {
    mountedFlashcardPreview = undefined;
    jest.clearAllMocks();
  });

  it('Matches to snapshot', () => {
    expect(flashcardPreview(props, true));
  });

  describe('always', () => {
    beforeEach(() => {
      mountedFlashcardPreview = flashcardPreview(props);
    });

    it('renders an card', () => {
      const cardContainer = mountedFlashcardPreview.find('.wordPreview_container');
      expect(cardContainer.exists()).toEqual(true);
    });

    it('is not visible', () => {
      const cardContainer = mountedFlashcardPreview.find('.wordPreview_container');
      expect(cardContainer.props().style).toHaveProperty('visibility', 'hidden');
    });

    it('renders an img container', () => {
      const imgContainer = mountedFlashcardPreview.find('.wordPreview_imgContainer');
      expect(imgContainer.exists()).toEqual(true);
    });

    it('renders a No Image Available img', () => {
      const img = mountedFlashcardPreview.find('.wordPreview_img');
      expect(img.props().src).toEqual(noImg);
    });
  });

  describe('when `toggleVisibility` is true', () => {
    beforeEach(() => {
      props.toggleVisibility = true;
      mountedFlashcardPreview = flashcardPreview(props);
    });

    it('is visible', () => {
      const cardContainer = mountedFlashcardPreview.find('.wordPreview_container');
      expect(cardContainer.props().style).toHaveProperty('visibility', 'visible');
    });
  });

  describe('when `imgUrls` is not empty', () => {
    beforeEach(() => {
      props.imgUrls = ['my first url', 'my second url'];
      mountedFlashcardPreview = flashcardPreview(props);
    });

    it('renders an img for each url', () => {
      const imgContainer = mountedFlashcardPreview.find('.wordPreview_imgContainer');
      expect(imgContainer.children()).toHaveLength(2);
    });

    it('passes the urls to the src prop', () => {
      const imgs = mountedFlashcardPreview.find('.wordPreview_img--small');
      expect(imgs.first().props().src).toEqual('my first url');
      expect(imgs.at(1).props().src).toEqual('my second url');
    });
  });

  describe('when `name` is passed', () => {
    beforeEach(() => {
      props.name = 'My Word Preview';
      mountedFlashcardPreview = flashcardPreview(props);
    });

    it('renders the name', () => {
      const name = mountedFlashcardPreview.find('.wordPreview_title');
      expect(name.text()).toEqual('My Word Preview');
    });
  });
});
