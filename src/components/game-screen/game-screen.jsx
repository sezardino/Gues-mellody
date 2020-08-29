import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { AppRoute } from "../../const";

import Mistakes from "../mistakes/mistakes.jsx";
import Timer from "../timer/timer.jsx";

import withTimer from "../../hocs/with-timer/with-timer";

const TimerWrapped = withTimer(Timer);
export default class GameScreen extends PureComponent {
  render() {
    return (
      <section className={`game game--${this.props.type}`}>
        <header className="game__header">
          <Link
            className="game__back"
            to={AppRoute.main}
            onClick={this.props.onGoBackClick}
          >
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img
              className="game__logo"
              src="img/melody-logo-ginger.png"
              alt="Угадай мелодию"
            />
          </Link>
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
          <TimerWrapped
            time={this.props.time}
            onTimeEnd={this.props.onTimeEnd}
          />
          <Mistakes mistakes={this.props.mistakes} />
        </header>

        {this.props.children}
      </section>
    );
  }
}
