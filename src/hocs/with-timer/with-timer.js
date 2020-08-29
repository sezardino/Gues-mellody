import React, { PureComponent } from "react";

const withTimer = (Component) => {
  class WithTimer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        allTime: props.time,
        time: props.time * 60,
      };
    }

    componentDidMount() {
      this.interval = setInterval(() => {
        this.setState((state) => ({ time: state.time - 1 }));
      }, 1000);
    }

    componentDidUpdate() {
      const { onTimeEnd } = this.props;
      if (this.state.time <= 0) {
        onTimeEnd();
      }
    }

    changeTime() {
      let { time } = this.props;
      console.log(time);

      return time - 1;
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render() {
      return <Component time={this.state.time} />;
    }
  }

  return WithTimer;
};

export default withTimer;
