import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function PeriodBtns(props) {
  return (
    <span>
      <button className="periodBtn btn" {...props} role="button">
        1d
    </button>

      <button className="periodBtn btn" {...props} role="button">
        5d
    </button>

      <button className="periodBtn btn" {...props} role="button">
        1m
    </button>

      <button className="periodBtn btn" {...props} role="button">
        3m
    </button>

      <button className="periodBtn btn" {...props} role="button">
        1y
    </button>

    <button className="periodBtn btn" {...props} role="button">
        3y
    </button>

    <button className="periodBtn btn" {...props} role="button">
        5y
    </button>

    </span>
  );
}

export default PeriodBtns;
