import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ActionCreator } from "../../reducer";

import WelcomeWindow from "../welcome-window/welcome-window.jsx";
import GameScreen from "../game-screen/game-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GameOverScreen from "../game-over-screen/game-over-screen.jsx";
import WinScreen from "../win-screen/win-screen.jsx";

import withActivePlayer from "../../hocs/with-active-player/with-active-player";
import withAnswers from "../../hocs/with-answers/with-answers";

const GenreQuestionScreenWrapper = withAnswers(
  withActivePlayer(GenreQuestionScreen)
);

const ArtistQuestionScreenWrapped = withAnswers(
  withActivePlayer(ArtistQuestionScreen)
);

class App extends Component {
  static getScreen(props) {
    const {
      step,
      mistakes,
      maxMistakes,
      allTime,
      time,
      questions,
      onAnswerClick,
      onWelcomeButtonClick,
      timerLaunch,
      reset,
    } = props;
    const question = questions[step];
    if (step === -1) {
      // step >= questions.length && reset();
      return (
        <WelcomeWindow
          lives={mistakes}
          time={time}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
      );
    }

    if (mistakes >= maxMistakes) {
      return <GameOverScreen onResetButtonClick={reset} />;
    }

    if (step >= questions.length) {
      return (
        <WinScreen
          onResetButtonClick={reset}
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
            onTimerStart={timerLaunch}
            mistakes={mistakes}
            onTimeEnd={reset}
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
            onTimerStart={timerLaunch}
            mistakes={mistakes}
            onTimeEnd={reset}
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
  render() {
    const { renderScreen } = this.props;

    return <>{renderScreen()}</>;
  }
}

App.propTypes = {
  step: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  maxMistakes: PropTypes.number.isRequired,
  allTime: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  onAnswerClick: PropTypes.func.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    step: state.step,
    mistakes: state.mistakes,
    maxMistakes: state.maxMistakes,
    allTime: state.allTime,
    time: state.time,
    questions: state.questions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onWelcomeButtonClick() {
      dispatch(ActionCreator.incrementStep());
    },w

    timerLaunch() {
      dispatch(ActionCreator.incrementTime());
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

export default App;
// export default connect(mapStateToProps, mapDispatchToProps)(App);
