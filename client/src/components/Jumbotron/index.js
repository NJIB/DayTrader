import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 100, clear: "both", paddingTop: 50, textAlign: "left" }}
      // className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
