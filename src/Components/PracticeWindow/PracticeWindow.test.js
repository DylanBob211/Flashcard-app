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

    it('renders a div container', () => {
      const divContainer = mountedPracticeWindow.find('.practiceWindow_container'); 
      expect(divContainer.exists()).toEqual(true);
    });

    describe('when a windowState object is passed with key `case` = `flashcard`', () => {
      let flashcardComponent;
      beforeEach(() => {
        props.windowState = {
          case: 'flashcard',
          data: [{ word: 'someData', url: [] }],
        };
        mountedPracticeWindow = testWrapper(PracticeWindow, props);
        flashcardComponent = mountedPracticeWindow
          .find('Flashcard');
      });

      it('renders a Flashcard component', () => {
        expect(flashcardComponent.exists()).toEqual(true);
      });

      it('passes `data` key reference to the Flashcard component', () => {
        expect(flashcardComponent.props().data).toEqual([{ word: 'someData', url: [] }]);
      });

    });

    describe('when a windowState object is passed with key `case` = `list', () => {
      beforeEach(() => {
        props.windowState = {
          case: 'list',
          data: ['someData'],
        };
        mountedPracticeWindow = testWrapper(PracticeWindow, props);
      });

      it('renders a composed ExerciseSettingsPanel component', () => {
        const panelComponent = mountedPracticeWindow
          .find('ExerciseSettingsPanel');
        expect(panelComponent.exists()).toEqual(true);
      });

      it('passes `data` key reference to the ExerciseSettingsPanel component', () => {
        const panelComponent = mountedPracticeWindow
          .find('ExerciseSettingsPanel');
        expect(panelComponent.props().data).toEqual(['someData']);
      });
    });
  });
});
