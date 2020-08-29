import React, { PureComponent } from "react";
import PropTypes from "prop-types";

const withPlayer = (Component) => {
  class WithPlayer extends PureComponent {
    constructor(props) {
      super(props);
      this.audioRef = React.createRef(this.audioRef);

      this.state = {
        isLoading: true,
        isPlayed: props.isPlayed,
      };
      this.playClickHandler = this.playClickHandler.bind(this);
    }

    componentDidMount() {
      const audio = this.audioRef.current;
      audio.src = this.props.src;

      audio.oncanplaythrough = () => {
        this.setState({
          isLoading: false,
        });
      };

      audio.onplay = () => {
        this.setState({ isPlayed: true });
      };

      audio.onpause = () => {
        this.setState({ isPlayed: false });
      };

      // this.audio.ontimeupdate = () => {
      //   this.setState({ progress: this.audio.currentTime });
      // };
    }

    componentDidUpdate() {
      const audio = this.audioRef.current;
      if (this.props.isPlayed) {
        audio.play();
      } else {
        audio.pause();
      }
    }

    componentWillUnmount() {
      const audio = this.audioRef.current;
      audio.onplay = null;
      audio.onpause = null;
      audio.oncanplaythrough = null;
      audio.src = ``;
      audio.ontimeupdate = null;
    }

    playClickHandler() {
      this.setState((state) => ({
        isPlayed: !state.isPlayed,
      }));
      this.props.onPlayClick();
    }

    render() {
      const { isLoading, isPlayed } = this.state;
      return (
        <Component
          {...this.props}
          isLoading={isLoading}
          isPlayed={isPlayed}
          onPlayClick={this.playClickHandler}
        >
          <audio ref={this.audioRef} />
        </Component>
      );
    }
  }
  return WithPlayer;
};

export default withPlayer;
