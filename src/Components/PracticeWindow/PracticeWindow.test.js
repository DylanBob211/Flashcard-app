import testWrapper from '../../Helpers/testComponentMountWrapper';
import PracticeWindow from './PracticeWindow';

describe('PracticeWindow', () => {
  let mountedPracticeWindow;

  beforeEach(() => {
    mountedPracticeWindow = undefined;
    jest.clearAllMocks();
  });
  const props = {
    closeExerciseWindow: jest.fn(),
  };

  it('matches to snapshot', () => {
    expect(testWrapper(PracticeWindow, props, true)).toMatchSnapshot();
  });

  describe('always', () => {
    beforeEach(() => {
      mountedPracticeWindow = testWrapper(PracticeWindow, props);
    });

    it('renders null', () => {
      expect(mountedPracticeWindow.isEmptyRender()).toEqual(true);
    });

    describe('when a windowState object is passed with key `case` = `flashcard`', () => {
      beforeEach(() => {
        props.windowState = {
          case: 'flashcard',
          data: [{ word: 'someData', url: [] }],
        };
        mountedPracticeWindow = testWrapper(PracticeWindow, props);
      });

      it('renders a WindowFlashcard component', () => {
        const flashcardComponent = mountedPracticeWindow
          .find('Flashcard');
        expect(flashcardComponent.exists()).toEqual(true);
      });

      it('passes `data` key reference to the Flashcard component', () => {
        const flashcardComponent = mountedPracticeWindow
          .find('Flashcard');
        expect(flashcardComponent.props().data).toEqual([{ word: 'someData', url: [] }]);
      });
    });

    describe('when a windowState object is passed with key `case` = `list', () => {
      beforeEach(() => {
        props.windowState = {
          case: 'list',
          data: ['someData'],
        };
        mountedPracticeWindow = testWrapper(PracticeWindow, props, true);
      });

      it('renders a composed ExerciseSettingsPanel component', () => {
        const panelComponent = mountedPracticeWindow
          .find('ExerciseSettingsPanel');
        expect(panelComponent.exists()).toEqual(true);
        expect(panelComponent.parent().props().className).toEqual('practiceWindow_container');
      });

      it('passes `data` key reference to the ExerciseSettingsPanel component', () => {
        const panelComponent = mountedPracticeWindow
          .find('ExerciseSettingsPanel');
        expect(panelComponent.props().data).toEqual(['someData']);
      });
    });
  });
});
