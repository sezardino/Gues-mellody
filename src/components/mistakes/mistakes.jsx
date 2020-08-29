import React from "react";
import PropTypes from "prop-types";

const Mistakes = (props) => {
  const { mistakes } = props;
  const mistakesCount = Array(mistakes).fill("");

  return (
    <div className="game__mistakes">
      {mistakesCount.map((item, i) => (
        <div className="wrong" key={i} />
      ))}
    </div>
  );
};

Mistakes.propTypes = {
  mistakes: PropTypes.number.isRequired,
};

export default Mistakes;
