import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 100, clear: "both", paddingTop:"30px", textAlign: "left" }}
      // className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
