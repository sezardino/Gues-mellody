import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Player from "../player/player.jsx";
import Mistakes from "../mistakes/mistakes.jsx";
import Timer from "../timer/timer.jsx";

export default class SingerQuestion extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      answer: "",
    };
  }
  render() {
    const { onUserAnswer, question, mistakes, maxMistakes } = this.props;
    const { answers, song } = question;
    const { src } = song;
    return (
      <section className="game game--artist">
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
          <h2 className="game__title">Кто исполняет эту песню?</h2>
          <div className="game__track">
            <div className="track">
              <Player src={src} />
            </div>
          </div>
          <form
            className="game__artist"
            onChange={(evt) => {
              evt.preventDefault();
              onUserAnswer(question, this.state.answer, mistakes, maxMistakes);
            }}
          >
            {answers.map(({ artist, picture }, i) => {
              return (
                <div className="artist" key={question.type + i}>
                  <input
                    className="artist__input visually-hidden"
                    type="radio"
                    name="answer"
                    id={"answer" + i}
                  />
                  <label className="artist__name" htmlFor={"answer" + i}>
                    <img
                      className="artist__picture"
                      src={picture}
                      alt={artist}
                      onClick={() => {
                        this.setState({ answer: artist });
                      }}
                    />
                    {artist}
                  </label>
                </div>
              );
            })}
          </form>
        </section>
      </section>
    );
  }
}

SingerQuestion.propsType = {
  question: PropTypes.object.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
};
