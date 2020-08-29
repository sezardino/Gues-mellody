const initState = {
  questions: [],
};

const ActionType = {
  LOAD_QUESTIONS: `LOAD_QUESTIONS`,
};

const ActionCreator = {
  loadQuestions: (questions) => ({
    type: ActionType.LOAD_QUESTIONS,
    payload: questions,
  }),
};

const Operation = {
  loadQuestions: () => (dispatch, _getState, api) => {
    return api.get(`/questions`).then((response) => {
      dispatch(ActionCreator.loadQuestions(response.data));
    });
  },
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ActionType.LOAD_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };
  }
  return state;
};

export { ActionCreator, ActionType, Operation, reducer };
