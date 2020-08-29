import { GameType } from "../../const";

const initState = {
  step: -1,
  mistakes: 0,
};

const genreAnswerCheck = (question, answer) => {
  return answer.every((item, i) => {
    return item === (question.genre === question.answers[i].genre);
  });
};

const artistAnswerCheck = (question, answer) => {
  return question.song.artist === answer;
};

const ActionType = {
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  INCREMENT_STEP: `INCREMENT_STEP`,
  RESET: `RESET`,
};

const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  }),

  incrementMistakes: (question, answer, mistakes, maxMistakes) => {
    let isCorrect = false;

    switch (question.type) {
      case GameType.GENRE:
        isCorrect = genreAnswerCheck(question, answer);
        break;
      case GameType.ARTIST:
        isCorrect = artistAnswerCheck(question, answer);
        break;
    }

    if (!isCorrect && mistakes + 1 >= maxMistakes) {
      return {
        type: `RESET`,
      };
    }

    return {
      type: ActionType.INCREMENT_MISTAKES,
      payload: !isCorrect ? 1 : 0,
    };
  },

  reset: () => ({
    type: ActionType.RESET,
  }),
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      return {
        ...state,
        step: state.step + action.payload,
      };
    case ActionType.INCREMENT_MISTAKES:
      return {
        ...state,
        mistakes: state.mistakes + action.payload,
      };
    case ActionType.RESET:
      return initState;
  }

  return state;
};

export {
  ActionCreator,
  ActionType,
  reducer,
  genreAnswerCheck,
  artistAnswerCheck,
};
