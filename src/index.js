import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { reducer, Operation } from "./reducer.js";
import thunk from "redux-thunk";
import { compose } from "recompose";
import { createAPI } from "./api";
import { gameSettings } from "./const";
import withChangeScreen from "./hocs/with-change-screen/with-change-screen";

import App from "./components/App/app.jsx";

const AppWrapped = withChangeScreen(App);

const init = () => {
  const api = createAPI((...args) => store.dispatch(...args));
  const store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk.withExtraArgument(api)),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
    )
  );
  const loadQuestions = () => {
    store.dispatch(Operation.loadQuestions());
  };
  loadQuestions();
  ReactDOM.render(
    <Provider store={store}>
      {/* <App /> */}
      <AppWrapped
        maxMistakes={gameSettings.errorCount}
        time={gameSettings.time}
        resetData={loadQuestions}
      />
    </Provider>,
    document.getElementById("root")
  );
};

init();
