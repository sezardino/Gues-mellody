import React from "react";
import { Link } from "react-router-dom";
import { AppRoute } from "../../const";

const WinScreen = (props) => {
  console.log(props);
  const {
    onResetButtonClick,
    location: {
      state: { time, mistakes, step, allTime },
    },
  } = props;
  const elapsedTime = allTime * 60 - time;
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;
  const points = step - mistakes;

  return (
    <section className="result">
      <div className="result__logo">
        <img
          src="img/melody-logo.png"
          alt="Угадай мелодию"
          width={186}
          height={83}
        />
      </div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">
        За {minutes} минуты и {seconds} секунд вы набрали {points} баллов (8
        быстрых), совершив {mistakes} ошибки
      </p>
      <p className="result__text">
        Вы&nbsp;заняли 2&nbsp;место из&nbsp;10. Это лучше чем у&nbsp;80% игроков
      </p>
      <Link
        to={AppRoute.main}
        className="replay"
        type="button"
        onClick={onResetButtonClick}
      >
        Сыграть ещё раз
      </Link>
    </section>
  );
};

export default WinScreen;
