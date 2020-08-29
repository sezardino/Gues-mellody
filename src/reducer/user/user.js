const initState = {
  isAuthorizationRequired: false,
};

const ActionType = {
  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`,
};

const ActionCreator = {
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRE_AUTHORIZATION,
    payload: status,
  }),
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ActionType.REQUIRE_AUTHORIZATION: {
      return {
        ...status,
        isAuthorizationRequired: action.payload,
      };
    }
  }

  return state;
};

export { ActionCreator, ActionType, reducer };
