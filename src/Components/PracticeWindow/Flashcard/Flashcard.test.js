import testWrapper from '../../../Helpers/testComponentMountWrapper';
import Flashcard from './Flashcard';

const NO_IMG = require('../../../Assets/imgs/no_img.svg');

describe('Flashcard', () => {
  let mountedFlashcard;
  const props = {};
  const wordTest = 'Hello Word';
  const urlTest = ['urlOne', 'urlTwo', 'urlThree'];

  beforeEach(() => {
    mountedFlashcard = undefined;
  });

  it('matches to snapshot', () => {
    expect(testWrapper(Flashcard, props, true)).toMatchSnapshot();
  });

  describe('always', () => {
    beforeEach(() => {
      mountedFlashcard = testWrapper(Flashcard, props);
    });

    it('renders "(no word)"', () => {
      expect(mountedFlashcard.text()).toEqual('(no word)');
    });

    it('renders an img with src set to NO_IMG', () => {
      const img = mountedFlashcard.find('img');
      expect(img.exists()).toEqual(true);
      expect(img.props().src).toEqual(NO_IMG);
    });

    describe('when `data` is passed', () => {
      beforeEach(() => {
        props.data = {
          word: wordTest,
          url: urlTest,
        };
        mountedFlashcard = testWrapper(Flashcard, props);
      });

      it('renders `word` key of `data` as text', () => {
        expect(mountedFlashcard.text()).toEqual(wordTest);
      });

      it('renders a container with imgs in it', () => {
        const imgContainer = mountedFlashcard.find('.flashcard_imgContainer');
        expect(imgContainer.exists()).toEqual(true);
      });

      it('renders an img for each element in the `url` array of `data`', () => {
        const imgContainer = mountedFlashcard.find('.flashcard_imgContainer');
        expect(imgContainer.children().length).toEqual(3);
      });
    });
  });
});
