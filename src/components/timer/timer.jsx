import React from "react";
import { formatTime } from "../../services";

const Timer = (props) => {
  const { time } = props;
  const minutes = formatTime(Math.floor(time / 60));
  const seconds = formatTime(time % 60);
  return (
    <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
      <span className="timer__mins">{minutes}</span>
      <span className="timer__dots">:</span>
      <span className="timer__secs">{seconds}</span>
    </div>
  );
};

export default Timer;
