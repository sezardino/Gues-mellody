import {
  reducer,
  ActionType,
  genreAnswerCheck,
  artistAnswerCheck,
  ActionCreator,
} from "./reducer";

describe(`Reducer`, () => {
  let initState, stepAction, mistakesAction, resetAction;

  beforeEach(() => {
    initState = {
      step: -1,
      mistakes: 0,
    };

    stepAction = {
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    };

    mistakesAction = {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 1,
    };
    resetAction = {
      type: ActionType.RESET,
    };
  });

  describe(`increment steps`, () => {
    it(`steps changed correctly with given value`, () => {
      expect(reducer(initState, stepAction)).toEqual({ step: 0, mistakes: 0 });
    });

    it(`steps doesn't changed when payload = 0`, () => {
      expect(
        reducer(initState, { type: ActionType.INCREMENT_STEP, payload: 0 })
      ).toEqual({ step: -1, mistakes: 0 });
    });
  });

  describe(`increment mistakes`, () => {
    it(`mistakes changed correctly with given value`, () => {
      expect(reducer(initState, mistakesAction)).toEqual({
        step: -1,
        mistakes: 1,
      });
    });
    it(`mistakes doesn't changed when payload = 0`, () => {
      expect(
        reducer(initState, { type: ActionType.INCREMENT_MISTAKES, payload: 0 })
      ).toEqual(initState);
    });
  });

  describe(`reset`, () => {
    it(`reset data correctly`, () => {
      expect(reducer({ step: 999, mistakes: 888 }, resetAction)).toEqual(
        initState
      );
    });
  });
});

describe(`Check answers`, () => {
  let artistQuestion,
    artistAnswer,
    wrongArtistAnswer,
    genreQuestion,
    genreAnswer,
    wrongGenreAnswer;
  beforeEach(() => {
    artistQuestion = {
      type: `artist`,
      song: {
        artist: `Jim Beam`,
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      },
      answers: [
        {
          picture: `test.png`,
          artist: `John Snow`,
        },
        {
          picture: `test.png`,
          artist: `Jack Daniels`,
        },
        {
          picture: `test.png`,
          artist: `Jim Beam`,
        },
      ],
    };
    artistAnswer = `Jim Beam`;
    wrongArtistAnswer = `John Snow`;
    genreQuestion = {
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
          genre: `rock`,
        },
        {
          src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
          genre: `blues`,
        },
        {
          src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
          genre: `jazz`,
        },
        {
          src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
          genre: `rock`,
        },
      ],
    };

    genreAnswer = [true, false, false, true];
    wrongGenreAnswer = [true, true, false, true];
  });

  describe(`artist`, () => {
    it(`correctly checking right answer`, () => {
      expect(artistAnswerCheck(artistQuestion, artistAnswer)).toBe(true);
    });
    it(`correctly checking answer with wrong answer`, () => {
      expect(artistAnswerCheck(artistQuestion, wrongArtistAnswer)).toBe(false);
    });
  });

  describe(`genre`, () => {
    it(`correctly checking right answer`, () => {
      expect(genreAnswerCheck(genreQuestion, genreAnswer)).toBe(true);
    });
    it(`correctly check answer with wrong answer`, () => {
      expect(genreAnswerCheck(genreQuestion, wrongGenreAnswer)).toBe(false);
    });
  });
});

describe(`Action creator`, () => {
  let artistQuestion,
    artistAnswer,
    wrongArtistAnswer,
    genreQuestion,
    genreAnswer,
    wrongGenreAnswer,
    incrementMistakesTrue,
    incrementMistakesFalse;
  beforeEach(() => {
    artistQuestion = {
      type: `artist`,
      song: {
        artist: `Jim Beam`,
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      },
      answers: [
        {
          picture: `test.png`,
          artist: `John Snow`,
        },
        {
          picture: `test.png`,
          artist: `Jack Daniels`,
        },
        {
          picture: `test.png`,
          artist: `Jim Beam`,
        },
      ],
    };
    artistAnswer = `Jim Beam`;
    wrongArtistAnswer = `John Snow`;
    genreQuestion = {
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
          genre: `rock`,
        },
        {
          src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
          genre: `blues`,
        },
        {
          src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
          genre: `jazz`,
        },
        {
          src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
          genre: `rock`,
        },
      ],
    };
    genreAnswer = [true, false, false, true];
    wrongGenreAnswer = [true, true, false, true];
    incrementMistakesTrue = { type: ActionType.INCREMENT_MISTAKES, payload: 1 };
    incrementMistakesFalse = {
      type: ActionType.INCREMENT_MISTAKES,
      payload: 0,
    };
  });
  describe(`Increment Mistakes`, () => {
    it(`With correct answer for genre questions returns payload with value 1`, () => {
      expect(
        ActionCreator.incrementMistakes(genreQuestion, genreAnswer)
      ).toEqual(incrementMistakesTrue);
    });
    it(`With incorrect answer for genre questions returns payload with value 0`, () => {
      expect(
        ActionCreator.incrementMistakes(genreQuestion, wrongGenreAnswer)
      ).toEqual(incrementMistakesFalse);
    });

    it(`With correct answer for artist questions returns payload with value 1`, () => {
      expect(
        ActionCreator.incrementMistakes(artistQuestion, artistAnswer)
      ).toEqual(incrementMistakesTrue);
    });
    it(`With incorrect answer for artist questions returns payload with value 0`, () => {
      expect(
        ActionCreator.incrementMistakes(artistQuestion, wrongArtistAnswer)
      ).toEqual(incrementMistakesFalse);
    });
  });
});
