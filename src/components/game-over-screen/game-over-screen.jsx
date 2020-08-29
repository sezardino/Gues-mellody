import React from "react";

const GameOverScreen = (props) => {
  const {
    onResetButtonClick,
    description: { title, total },
  } = props;

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
      <h2 className="result__title">{title}</h2>
      <p className="result__total result__total--fail">{total}</p>
      <button className="replay" type="button" onClick={onResetButtonClick}>
        Попробовать ещё раз
      </button>
    </section>
  );
};

export default GameOverScreen;
