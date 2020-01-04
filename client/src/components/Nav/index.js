import React from "react";
import { Nav } from 'react-bootstrap';
import { Col, Row, Container } from "../Grid";
import "./style.css";

function NavBar() {
  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-info">
      <Col size="md-9">
      <a className="navbar-brand logo" href="/">
        <img src="/images/target.png" width="50" height="50" className="d-inline-block align-top" id="hunoza_target" alt="hunoza target" />
        Day Trader
      </a>
      </Col>


      <Nav variant="tabs" defaultActiveKey="/">
        <Nav.Item>
          <Nav.Link href="/">Research Stocks</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="portfolio" href="/portfolio">Portfolio</Nav.Link><span className="sr-only">(current)</span>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="detail" href="/detail">Detail</Nav.Link>
        </Nav.Item>
      </Nav>

    </nav>
  );
}

export default NavBar;
