const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initState = {
  isAuthorizationRequired: AuthorizationStatus.AUTH,
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

const Operation = {
  checkAuth: (dispatch, getState, api) => {
    return api.get(`/login`).then(() => {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
    });
  },
  checkAuth: () => (dispatch, getState, api) => {
    return api
      .get(`/login`)
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      })
      .catch((err) => {
        throw err;
      });
  },
  login: (authData) => (dispatch, getState, api) => {
    return api
      .post(`/login`, {
        login: authData.login,
        password: authData.payload,
      })
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      });
  },
};

export { ActionCreator, ActionType, Operation, reducer, AuthorizationStatus };
