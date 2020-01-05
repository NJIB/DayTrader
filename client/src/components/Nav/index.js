import React from "react";
import { Nav } from 'react-bootstrap';
import { Col, Row, Container } from "../Grid";
import { Tabs } from "../Tabs";
import "./style.css";

function NavBar() {
  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-info">
      <Col size="md-6">
      <a className="navbar-brand logo" href="/">
        <img src="/images/target.png" width="50" height="50" className="d-inline-block align-top" id="hunoza_target" alt="hunoza target" />
        Day Trader
      </a>
      </Col>

    {/* Bringing in Tabs */}
      <Tabs />

    </nav>
  );
}

export default NavBar;
