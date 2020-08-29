import React, { PureComponent } from "react";

export default class Timer extends PureComponent {
  componentDidMount() {
    const { onTimerStart } = this.props;
    this.interval = setInterval(onTimerStart, 1000);
  }

  componentDidUpdate() {
    const { time, onTimeEnd } = this.props;
    if (time <= 0) {
      onTimeEnd();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  formatTime(time) {
    return time.toString().length === 1 ? `0${time}` : time;
  }

  render() {
    const { time } = this.props;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return (
      <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
        <span className="timer__mins">{this.formatTime(minutes)}</span>
        <span className="timer__dots">:</span>
        <span className="timer__secs">{this.formatTime(seconds)}</span>
      </div>
    );
  }
}
