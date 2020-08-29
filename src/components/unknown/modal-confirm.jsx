import React from "react";

const ModalConfirm = (props) => {
  return (
    <section className="modal">
      <button className="modal__close" type="button">
        <span className="visually-hidden">Закрыть</span>
      </button>
      <h2 className="modal__title">Подтверждение</h2>
      <p className="modal__text">Вы уверены что хотите начать игру заново?</p>
      <div className="modal__buttons">
        <button className="modal__button button">Ок</button>
        <button className="modal__button button">Отмена</button>
      </div>
    </section>
  );
};
