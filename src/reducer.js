import { GameType } from "./const";
// import { questions } from "./mock/data";

const initState = {
  step: -1,
  mistakes: 0,
  maxMistakes: 3,
  allTime: 300,
  time: 10,
  questions: [],
  isAuthorizationRequired: false,
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
  INCREMENT_TIME: `INCREMENT_TIME`,
  RESET: `RESET`,
  LOAD_QUESTIONS: `LOAD_QUESTIONS`,
  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`,
};

const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  }),

  incrementTime: () => ({
    type: ActionType.INCREMENT_TIME,
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

  loadQuestions: (questions) => ({
    type: ActionType.LOAD_QUESTIONS,
    payload: questions,
  }),

  authorization: (status) => ({
    type: ActionType.REQUIRE_AUTHORIZATION,
    payload: status,
  }),
};

const Operation = {
  loadQuestions: () => (dispatch, _getState, api) => {
    return api.get(`/questions`).then((response) => {
      dispatch(ActionCreator.loadQuestions(response.data));
    });
  },
  // authorization: () => (dispatch, _getState, api) => {
  //   return api.post(`/login`)
  // }
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
    case ActionType.INCREMENT_TIME:
      return {
        ...state,
        time: state.time - action.payload,
      };
    case ActionType.RESET:
      return initState;
    case ActionType.LOAD_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };
    case ActionType.REQUIRE_AUTHORIZATION: {
      return {
        ...status,
        isAuthorizationRequired: action.payload,
      };
    }
  }

  return state;
};

export {
  reducer,
  ActionType,
  genreAnswerCheck,
  artistAnswerCheck,
  ActionCreator,
  Operation,
};
