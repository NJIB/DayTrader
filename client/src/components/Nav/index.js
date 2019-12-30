import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-info">
      <a className="navbar-brand" href="/">
      <img src="/images/target.png" width="30" height="30" className="d-inline-block align-top" id="hunoza_target" alt="hunoza target" />
      Day Trader
      </a>

  {/* <button className="navbar-toggler toggler-example" type="button" data-toggle="collapse" data-target="#navbarSupportedContent1"
    aria-controls="navbarSupportedContent1" aria-expanded="false" aria-label="Toggle navigation"><span class="dark-blue-text"><i
        class="fas fa-bars fa-1x"></i></span></button> */}

  <div className="collapse navbar-collapse" id="navbarSupportedContent1">

    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" href="/">Research Stocks <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/portfolio">Portfolio</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/detail">Details</a>
      </li>
    </ul>

  </div>

</nav>

  );
}

export default Nav;
