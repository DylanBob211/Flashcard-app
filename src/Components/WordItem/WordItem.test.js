import React from 'react';
import { mount, shallow } from 'enzyme';
import WordItem from './WordItem';
// What does it render?

// Does my component render different things under different circumstances?

// When i pass a function as a prop, what does my component use it for?
// Does it call it, or just give it to another component
// If it calls it, what does it call it with?

// When the user interacts with my component, what happens?

describe('WordItem', () => {
  let mountedWordItem;

  const wordItem = (props, isShallow = false) => {
    const jsx = (<WordItem {...props} />);
    if (isShallow) return shallow(jsx);
    return mount(jsx);
  };

  const props = {
    wordItem: {
      word: 'hello',
      url: [],
    },
    wordId: 0,
  };

  beforeEach(() => {
    mountedWordItem = undefined;
  });

  it('matches to snapshot', () => {
    expect(wordItem(props, true)).toMatchSnapshot();
  });

  describe('always', () => {
    beforeEach(() => {
      mountedWordItem = wordItem(props);
    });

    it('renders `word` prop in a `li` item', () => {
      const { word } = props.wordItem;
      const textContainer = mountedWordItem.find('.wordItem_name');
      expect(textContainer.text()).toEqual(word);
    });

    it('renders a RemoveIcon button', () => {
      const removeIcon = mountedWordItem.find('RemoveIcon');
      expect(removeIcon.exists()).toEqual(true);
    });

    it('disables the RemoveIcon button', () => {
      const removeIcon = mountedWordItem.find('RemoveIcon');
      expect(removeIcon.props().disabled).toEqual(true);
    });

    it('does not render FlashcardPreview', () => {
      const flashcardPreview = mountedWordItem.find('FlashcardPreview');
      expect(flashcardPreview.exists()).toEqual(false);
    });

    describe('when mouse is over', () => {
      beforeEach(() => {
        mountedWordItem.simulate('mouseover');
      });

      it('renders FlashcardPreview after one second', (done) => {
        const flashcardPreview = mountedWordItem.find('FlashcardPreview');
        expect(flashcardPreview.exists()).toEqual(false);

        setTimeout(() => {
          mountedWordItem.update();
          const flashcardPreview = mountedWordItem.find('FlashcardPreview');
          expect(flashcardPreview.exists()).toEqual(true);
          done();
        }, 1001);
      });

      it('stops rendering FlashcardPreview when mouse is out', () => {
        mountedWordItem.simulate('mouseout');
        const flashcardPreview = mountedWordItem.find('FlashcardPreview');
        expect(flashcardPreview.exists()).toEqual(false);
      });
    });

    describe('when clicking RemoveIcon button', () => {
      beforeEach(() => {
        props.deleteWord = jest.fn();
        props.openFlashcard = jest.fn();
        mountedWordItem = wordItem(props);
        const btn = mountedWordItem.find('RemoveIcon');
        btn.simulate('click');
      });

      it('calls deleteWord', () => {
        const { deleteWord, wordItem, wordId } = props;
        expect(deleteWord).toHaveBeenCalledWith(wordItem.word, wordId);
      });

      it('prevents bubbling', () => {
        expect(props.openFlashcard).not.toHaveBeenCalled();
      });
    });

    describe('when clicking the whole element', () => {
      beforeEach(() => {
        props.deleteWord = jest.fn();
        props.openFlashcard = jest.fn();
        mountedWordItem = wordItem(props);
        mountedWordItem.simulate('click');
      });

      it('calls openFlashcard', () => {
        const { wordItem, openFlashcard } = props;
        expect(openFlashcard).toHaveBeenCalledWith(wordItem);
      });
    });
  });
});
