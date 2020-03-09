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

export function Btn10d(props) {
  return (
    <button {...props} className="10d periodBtn btn" role="button">
      {props.children}
      10d
    </button>
  );
}

export function Btn1m(props) {
  return (
    <button {...props} className="1m periodBtn btn" role="button">
      {props.children}
      1m
    </button>
  );
}

export function Btn3m(props) {
  return (
    <button {...props} className="3m periodBtn btn" role="button">
      {props.children}
      3m
    </button>
  );
}

export function Btn1y(props) {
  return (
    <button {...props} className="1y periodBtn btn" role="button">
      {props.children}
      1y
    </button>
  );
}

export function Btn3y(props) {
  return (
    <button {...props} className="3y periodBtn btn" role="button">
      {props.children}
      3y
    </button>
  );
}

export function Btn5y(props) {
  return (
    <button {...props} className="5y periodBtn btn" role="button">
      {props.children}
      5y
    </button>
  );
}

export function Btn10y(props) {
  return (
    <button {...props} className="10y periodBtn btn" role="button">
      {props.children}
      10y
    </button>
  );
}
