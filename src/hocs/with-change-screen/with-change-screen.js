import React, { PureComponent } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { ActionCreator } from "../../reducer/game/game";
import { gameOver, AppRoute } from "../../const";
import {
  Operation as UserOperation,
  AuthorizationStatus,
} from "../../reducer/user/user";

import WelcomeWindow from "../../components/welcome-window/welcome-window.jsx";
import GameScreen from "../../components/game-screen/game-screen.jsx";
import GenreQuestionScreen from "../../components/genre-question-screen/genre-question-screen.jsx";
import ArtistQuestionScreen from "../../components/artist-question-screen/artist-question-screen.jsx";
import GameOverScreen from "../../components/game-over-screen/game-over-screen.jsx";
import WinScreen from "../../components/win-screen/win-screen.jsx";
import AuthorizationScreen from "../../components/authorization-screen/authorization-screen.jsx";
import PrivateRoute from "../../components/private-route/private-route.jsx";

import withActivePlayer from "../with-active-player/with-active-player";
import withAnswers from "../with-answers/with-answers";

const GenreQuestionScreenWrapper = withAnswers(
  withActivePlayer(GenreQuestionScreen)
);

const ArtistQuestionScreenWrapped = withAnswers(
  withActivePlayer(ArtistQuestionScreen)
);

const withChangeScreen = (Component) => {
  class WithChangeScreen extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        timeEnd: false,
      };
      this.getScreen = this.getScreen.bind(this);
      this.resetGame = this.resetGame.bind(this);
      this.timeEnd = this.timeEnd.bind(this);
    }

    getScreen() {
      const {
        step,
        mistakes,
        maxMistakes,
        allTime,
        time,
        questions,
        onAnswerClick,
        onWelcomeButtonClick,
        authorizationStatus,
      } = this.props;
      const question = questions[step];

      if (step === -1) {
        return (
          <WelcomeWindow
            lives={maxMistakes}
            time={time}
            onWelcomeButtonClick={onWelcomeButtonClick}
          />
        );
      }

      if (mistakes >= maxMistakes) {
        return (
          <Redirect
            to={{
              pathname: AppRoute.lose,
              state: gameOver.triesEnd,
            }}
          />
        );
      }

      if (this.state.timeEnd) {
        return (
          <Redirect
            to={{
              pathname: AppRoute.lose,
              state: gameOver.timeEnd,
            }}
          />
        );
      }
      return (
        <Redirect
          to={{
            pathname: AppRoute.win,
            state: { time, allTime, mistakes, step },
          }}
        />
      );

      if (step >= questions.length) {
        if (authorizationStatus === AuthorizationStatus.AUTH) {
          return (
            <Redirect
              to={{
                pathname: AppRoute.win,
                state: { time, allTime, mistakes, step },
              }}
            />
          );
        } else if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
          return (
            <Redirect
              to={{
                pathname: AppRoute.auth,
                state: { time, mistakes },
              }}
            />
          );
        }
      }

      switch (question.type) {
        case "genre":
          return (
            <GameScreen
              time={time}
              mistakes={mistakes}
              onTimeEnd={this.timeEnd}
              onGoBackClick={this.resetGame}
            >
              <GenreQuestionScreenWrapper
                question={question}
                onUserAnswer={onAnswerClick}
              />
            </GameScreen>
          );
        case "artist":
          return (
            <GameScreen
              time={time}
              mistakes={mistakes}
              onTimeEnd={this.timeEnd}
              onGoBackClick={this.resetGame}
            >
              <ArtistQuestionScreenWrapped
                question={question}
                onUserAnswer={onAnswerClick}
              />
            </GameScreen>
          );
      }
      return null;
    }

    resetGame() {
      const { resetData, reset } = this.props;
      this.setState({ timeEnd: false });
      resetData();
      reset();
    }

    timeEnd() {
      this.setState({ timeEnd: true });
    }
    render() {
      return (
        <Switch>
          <Route
            path={AppRoute.main}
            exact
            render={() => (
              <Component {...this.props} renderScreen={this.getScreen} />
            )}
          />

          <Route
            path={AppRoute.auth}
            render={(props) => (
              <AuthorizationScreen
                {...props}
                onSubmit={this.props.login}
                onResetButtonClick={this.resetGame}
              />
            )}
          />

          <Route
            path={AppRoute.lose}
            render={(props) => (
              <GameOverScreen {...props} onResetButtonClick={this.resetGame} />
            )}
          />

          <PrivateRoute
            exact
            path={AppRoute.win}
            render={(props) => (
              <WinScreen {...props} onResetButtonClick={this.resetGame} />
            )}
          />
        </Switch>
      );
    }
  }

  return WithChangeScreen;
};

const mapStateToProps = (state) => {
  return {
    step: state.GAME.step,
    mistakes: state.GAME.mistakes,
    questions: state.DATA.questions,
    authorizationStatus: state.USER.isAuthorizationRequired,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login(authData) {
      dispatch(UserOperation.login(authData));
    },

    onWelcomeButtonClick() {
      dispatch(ActionCreator.incrementStep());
    },

    onAnswerClick(question, answer) {
      dispatch(ActionCreator.incrementMistakes(question, answer));
      dispatch(ActionCreator.incrementStep());
    },
    reset() {
      dispatch(ActionCreator.reset());
    },
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withChangeScreen
);
