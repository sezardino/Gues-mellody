import React, { PureComponent } from "react";
import withPlayer from "../with-player/with-player";
import Player from "../../components/player/player.jsx";

const AudioPlayer = withPlayer(Player);

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        activePlayer: -1,
      };
    }

    render() {
      const { activePlayer } = this.state;
      return (
        <Component
          {...this.props}
          renderPlayer={(src, id) => (
            <AudioPlayer
              src={src}
              activePlayer={activePlayer}
              isPlayed={id === activePlayer}
              onPlayClick={() =>
                this.setState(() => ({
                  activePlayer: activePlayer === id ? -1 : id,
                }))
              }
            />
          )}
        />
      );
    }
  }
  return WithActivePlayer;
};

export default withActivePlayer;
