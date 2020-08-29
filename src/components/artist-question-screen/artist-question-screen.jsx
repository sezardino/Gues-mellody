import React, { PureComponent } from "react";
import PropTypes from "prop-types";

const ArtistQuestionScreen = (props) => {
  const { question, renderPlayer, onAnswerClick, onAnswerChange } = props;
  const { answers, song } = question;
  const { src } = song;
  return (
    <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      <div className="game__track">
        <div className="track">{renderPlayer(src)}</div>
      </div>
      <form
        className="game__artist"
        onChange={(evt) => {
          evt.preventDefault();
          onAnswerChange();
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
                  onClick={() => onAnswerClick(artist)}
                />
                {artist}
              </label>
            </div>
          );
        })}
      </form>
    </section>
  );
};
// export default class ArtistQuestionScreen extends PureComponent {
//   render() {
//     const {
//       question,
//       renderPlayer,
//       onAnswerClick,
//       onAnswerChange,
//     } = this.props;
//     const { answers, song } = question;
//     const { src } = song;
//     console.log(this.props);
//     return (
//       <section className="game__screen">
//         <h2 className="game__title">Кто исполняет эту песню?</h2>
//         <div className="game__track">
//           <div className="track">{renderPlayer(src)}</div>
//         </div>
//         <form
//           className="game__artist"
//           onChange={(evt) => {
//             evt.preventDefault();
//             onAnswerChange();
//           }}
//         >
//           {answers.map(({ artist, picture }, i) => {
//             return (
//               <div className="artist" key={question.type + i}>
//                 <input
//                   className="artist__input visually-hidden"
//                   type="radio"
//                   name="answer"
//                   id={"answer" + i}
//                 />
//                 <label className="artist__name" htmlFor={"answer" + i}>
//                   <img
//                     className="artist__picture"
//                     src={picture}
//                     alt={artist}
//                     onClick={() => onAnswerClick(artist)}
//                   />
//                   {artist}
//                 </label>
//               </div>
//             );
//           })}
//         </form>
//       </section>
//     );
//   }
// }

ArtistQuestionScreen.propsType = {
  question: PropTypes.object.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
};

export default ArtistQuestionScreen;
