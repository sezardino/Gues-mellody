import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducer/reducer.js";
import { Operation as DataOperation } from "./reducer/data/data";
import {
  Operation as UserOperation,
  ActionCreator,
  AuthorizationStatus,
} from "./reducer/user/user";
import thunk from "redux-thunk";
import { compose } from "recompose";
import { createAPI } from "./api";
import { gameSettings } from "./const";
import withChangeScreen from "./hocs/with-change-screen/with-change-screen";

import App from "./components/App/app.jsx";

const AppWrapped = withChangeScreen(App);

const init = () => {
  const onUnauthorized = () => {
    store.dispatch(
      ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)
    );
  };

  const api = createAPI(onUnauthorized);
  const store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk.withExtraArgument(api)),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
    )
  );
  store.dispatch(UserOperation.checkAuth());
  const loadQuestions = () => {
    store.dispatch(DataOperation.loadQuestions());
  };
  loadQuestions();
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <AppWrapped
          maxMistakes={gameSettings.errorCount}
          time={gameSettings.time}
          resetData={loadQuestions}
        />
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
};

init();
