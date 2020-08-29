import React, { PureComponent } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { ActionCreator } from "../../reducer";
import { gameOver } from "../../const";

import WelcomeWindow from "../../components/welcome-window/welcome-window.jsx";
import GameScreen from "../../components/game-screen/game-screen.jsx";
import GenreQuestionScreen from "../../components/genre-question-screen/genre-question-screen.jsx";
import ArtistQuestionScreen from "../../components/artist-question-screen/artist-question-screen.jsx";
import GameOverScreen from "../../components/game-over-screen/game-over-screen.jsx";
import WinScreen from "../../components/win-screen/win-screen.jsx";
import AuthorizationScreen from "../../components/authorization-screen/authorization-screen.jsx";

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
        isAuthorizationRequired,
      } = this.props;
      const question = questions[step];
      if (isAuthorizationRequired) {
        return <AuthorizationScreen />;
      }
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
          <GameOverScreen
            description={gameOver.tryesEnd}
            onResetButtonClick={this.resetGame}
          />
        );
      }

      if (this.state.timeEnd) {
        return (
          <GameOverScreen
            description={gameOver.timeEnd}
            onResetButtonClick={this.resetGame}
          />
        );
      }

      if (step >= questions.length) {
        return (
          <WinScreen
            onResetButtonClick={this.resetGame}
            time={time}
            allTime={allTime}
            mistakes={mistakes}
          />
        );
      }

      switch (question.type) {
        case "genre":
          return (
            <GameScreen
              time={time}
              mistakes={mistakes}
              onTimeEnd={this.timeEnd}
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
      return <Component {...this.props} renderScreen={this.getScreen} />;
    }
  }
  return WithChangeScreen;
};

const mapStateToProps = (state) => {
  return {
    step: state.step,
    mistakes: state.mistakes,
    questions: state.questions,
    isAuthorizationRequired: state.isAuthorizationRequired,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
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
