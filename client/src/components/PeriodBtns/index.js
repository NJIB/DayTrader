import React from "react";
import "./style.css";

export function Btn1d(props) {
  return (
    <button {...props} className="1d periodBtn btn" role="button">
      {props.children}
      1d
    </button>
  );
}

export function Btn5d(props) {
  return (
    <button {...props} className="5d periodBtn btn" role="button">
      {props.children}
      5d
    </button>
  );
}



// const seconds1d = 86400;
// const seconds5d = 432000;
// const seconds1m = 2629800;
// const seconds3m = 7889400;
// const seconds1y = 31557600;
// const seconds3y = 94672800;
// const seconds5y = 157788000;
// const seconds10y = 315576000;

