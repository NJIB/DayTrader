import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function DeleteChartBtn(props) {
  return (
    <span>
      <button className="deleteChartBtn btn" {...props} role="button">
        Delete
    </button>
    </span>
  );
}

export default DeleteChartBtn;
