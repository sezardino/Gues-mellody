import React, { PureComponent, createRef } from "react";
import { Link } from "react-router-dom";
import { AppRoute } from "../../const";

export default class AuthorizationScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.loginRef = createRef();
    this.passwordRef = createRef();
  }

  submitHandler() {
    const { onSubmit } = this.props;
    const login = this.loginRef.current.value;
    const password = this.passwordRef.current.value;
    const userData = { login, password };
    onSubmit(userData);
  }

  render() {
    const {
      location: {
        state: { time, allTime, mistakes },
      },
      onResetButtonClick,
    } = this.props;
    const elapsedTime = allTime - time;
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    return (
      <section className="login">
        <div className="login__logo">
          <img
            src="img/melody-logo.png"
            alt="Угадай мелодию"
            width={186}
            height={83}
          />
        </div>
        <h2 className="login__title">Вы настоящий меломан!</h2>
        <p className="login__total">
          За {minutes} минуты и {seconds} секунд вы набрали 12 баллов (8
          быстрых), совершив {mistakes} ошибки
        </p>
        <p className="login__text">
          Хотите сравнить свой результат с предыдущими попытками? Представтесь!
        </p>
        <form
          className="login__form"
          onSubmit={(evt) => {
            evt.preventDefault();
            this.submitHandler();
          }}
        >
          <p className="login__field">
            <label className="login__label" htmlFor="name">
              Логин
            </label>
            <input
              className="login__input"
              type="text"
              name="name"
              id="name"
              ref={this.loginRef}
            />
          </p>
          <p className="login__field">
            <label className="login__label" htmlFor="password">
              Пароль
            </label>
            <input
              className="login__input"
              type="text"
              name="password"
              id="password"
              ref={this.passwordRef}
            />
            <span className="login__error">Неверный пароль</span>
          </p>
          <button className="login__button button" type="submit">
            Войти
          </button>
        </form>
        <Link
          to={AppRoute.main}
          className="replay"
          onClick={onResetButtonClick}
        >
          Сыграть ещё раз
        </Link>
      </section>
    );
  }
}
