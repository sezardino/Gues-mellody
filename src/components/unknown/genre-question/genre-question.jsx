import React, { PureComponent } from "react";
import PropTypes, { array } from "prop-types";
import Player from "../player/player.jsx";
import Mistakes from "../mistakes/mistakes.jsx";
import Timer from "../timer/timer.jsx";

export default class GenreQuestion extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      playedPlayer: -1,
      answers: Array(this.props.question.answers.length).fill(false),
    };
    this.onAnswerClickHandler = this.onAnswerClickHandler.bind(this);
  }

  componentWillUnmount() {
    this.setState({ playedPlayer: -1 });
  }

  onAnswerClickHandler(index) {
    this.setState(({ answers }) => {
      const newAnswer = !answers[index];
      return {
        answers: [
          ...answers.slice(0, index),
          newAnswer,
          ...answers.slice(index + 1),
        ],
      };
    });
  }

  render() {
    const { onUserAnswer, question, mistakes, maxMistakes } = this.props;
    const { genre, answers } = question;
    return (
      <section className="game game--genre">
        <header className="game__header">
          <a className="game__back" href="#">
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img
              className="game__logo"
              src="img/melody-logo-ginger.png"
              alt="Угадай мелодию"
            />
          </a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="timer"
            viewBox="0 0 780 780"
          >
            <circle
              className="timer__line"
              cx={390}
              cy={390}
              r={370}
              style={{
                filter: "url(#blur)",
                transform: "rotate(-90deg) scaleY(-1)",
                transformOrigin: "center",
              }}
            />
          </svg>
          <Timer time={this.props.time} />
          <Mistakes mistakes={this.props.mistakes} />
        </header>
        <section className="game__screen">
          <h2 className="game__title">Выберите {genre} треки</h2>
          <form className="game__tracks">
            {answers.map(({ src, genre }, i) => {
              return (
                <div className="track" key={genre + i}>
                  <Player
                    src={src}
                    currentPlayer={this.state.playedPlayer}
                    playerId={i}
                    onPlayClick={() => {
                      this.setState({ playedPlayer: i });
                    }}
                  />
                  <div className="game__answer">
                    <input
                      className="game__input visually-hidden"
                      type="checkbox"
                      checked={this.state.answers[i] ? true : false}
                      name="answer"
                      id={`answer-${i}`}
                      onChange={() => this.onAnswerClickHandler(i)}
                    />
                    <label className="game__check" htmlFor={`answer-${i}`}>
                      Отметить
                    </label>
                  </div>
                </div>
              );
            })}
            <button
              className="game__submit button"
              type="submit"
              onClick={(evt) => {
                evt.preventDefault();
                onUserAnswer(
                  question,
                  this.state.answers,
                  mistakes,
                  maxMistakes
                );
              }}
            >
              Ответить
            </button>
          </form>
        </section>
      </section>
    );
  }
}

GenreQuestion.propsType = {
  question: PropTypes.object.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
};
