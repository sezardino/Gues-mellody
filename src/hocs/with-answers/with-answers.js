import React, { PureComponent } from "react";

const withAnswers = (Component) => {
  class WithAnswers extends PureComponent {
    static getAnswer(props, state, handlers) {
      const { changeHandler, clickHandler, answerClickHandler } = handlers;
      switch (props.question.type) {
        case `genre`:
          const { answers } = state;
          return (
            <Component
              {...props}
              userAnswers={answers}
              onAnswerClick={clickHandler}
              onAnswerChange={changeHandler}
            />
          );
        case "artist":
          return (
            <Component
              {...props}
              onAnswerChange={clickHandler}
              onAnswerClick={answerClickHandler}
            />
          );
      }
      return null;
    }

    constructor(props) {
      super(props);
      switch (props.question.type) {
        case `genre`:
          this.state = {
            answers: Array(props.question.answers.length).fill(false),
          };
          break;
        case `artist`:
          this.state = {
            answer: "",
          };
          break;
      }

      this.changeHandler = this.changeHandler.bind(this);
      this.clickHandler = this.clickHandler.bind(this);
      this.answerClickHandler = this.answerClickHandler.bind(this);
    }

    changeHandler(index) {
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

    clickHandler() {
      const { onUserAnswer, question } = this.props;
      const { answers } = this.state;

      onUserAnswer(question, answers);
    }

    answerClickHandler(answer) {
      this.setState(() => ({ answer }));
    }

    render() {
      const handlers = {
        clickHandler: this.clickHandler,
        changeHandler: this.changeHandler,
        answerClickHandler: this.answerClickHandler,
      };
      return WithAnswers.getAnswer(this.props, this.state, handlers);
    }
  }
  return WithAnswers;
};

export default withAnswers;
