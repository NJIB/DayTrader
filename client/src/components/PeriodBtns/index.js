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
