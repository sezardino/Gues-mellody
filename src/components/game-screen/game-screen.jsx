import React, { PureComponent } from "react";
import Mistakes from "../mistakes/mistakes.jsx";
import Timer from "../timer/timer.jsx";

export default class GameScreen extends PureComponent {
  render() {
    return (
      <section className={`game game--${this.props.type}`}>
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
          <Timer
            time={this.props.time}
            onTimeEnd={this.props.onTimeEnd}
            onTimerStart={this.props.onTimerStart}
          />
          <Mistakes mistakes={this.props.mistakes} />
        </header>

        {this.props.children}
      </section>
    );
  }
}
