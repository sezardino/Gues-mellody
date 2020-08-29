import React, { PureComponent } from "react";
import PropTypes from "prop-types";

const GenreQuestionScreen = (props) => {
  const {
    onAnswerClick,
    onAnswerChange,
    question,
    renderPlayer,
    userAnswers,
  } = props;
  const { genre, answers } = question;

  return (
    <section className="game__screen">
      <h2 className="game__title">Выберите {genre} треки</h2>
      <form className="game__tracks">
        {answers.map(({ src, genre }, i) => {
          return (
            <div className="track" key={genre + i}>
              {renderPlayer(src, i)}
              <div className="game__answer">
                <input
                  className="game__input visually-hidden"
                  type="checkbox"
                  checked={userAnswers[i] ? true : false}
                  name="answer"
                  id={`answer-${i}`}
                  onChange={() => onAnswerChange(i)}
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
            onAnswerClick();
          }}
        >
          Ответить
        </button>
      </form>
    </section>
  );
};

// export default class GenreQuestionScreen extends PureComponent {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     const {
//       onAnswerClick,
//       onAnswerChange,
//       question,
//       renderPlayer,
//       userAnswers,
//     } = this.props;
//     const { genre, answers } = question;
//     return (
//       <section className="game__screen">
//         <h2 className="game__title">Выберите {genre} треки</h2>
//         <form className="game__tracks">
//           {answers.map(({ src, genre }, i) => {
//             return (
//               <div className="track" key={genre + i}>
//                 {renderPlayer(src, i)}
//                 <div className="game__answer">
//                   <input
//                     className="game__input visually-hidden"
//                     type="checkbox"
//                     checked={userAnswers[i] ? true : false}
//                     name="answer"
//                     id={`answer-${i}`}
//                     onChange={() => onAnswerChange(i)}
//                   />
//                   <label className="game__check" htmlFor={`answer-${i}`}>
//                     Отметить
//                   </label>
//                 </div>
//               </div>
//             );
//           })}
//           <button
//             className="game__submit button"
//             type="submit"
//             onClick={(evt) => {
//               evt.preventDefault();
//               onAnswerClick();
//             }}
//           >
//             Ответить
//           </button>
//         </form>
//       </section>
//     );
//   }
// }

GenreQuestionScreen.propsType = {
  question: PropTypes.object.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onAnswerClick: PropTypes.func.isRequired,
  onAnswerChange: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  userAnswers: PropTypes.array.isRequired,
};

export default GenreQuestionScreen;
