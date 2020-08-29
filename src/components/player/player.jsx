import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class Player extends PureComponent {
  render() {
    const { children, onPlayClick, isLoading, isPlayed } = this.props;
    return (
      <>
        <button
          className={`track__button track__button--${
            isPlayed ? "pause" : "play"
          }`}
          type="button"
          onClick={onPlayClick}
          disabled={isLoading}
        />
        <div className="track__status">{children}</div>
      </>
    );
  }
}

Player.propTypes = {
  src: PropTypes.string.isRequired,
  currentPlayer: PropTypes.number,
  playerId: PropTypes.number,
  onPlayClick: PropTypes.func,
};
