import React from "react";
import { Nav } from 'react-bootstrap';
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
export function Tabs(props) {
  return (
    <span className="tabsGroup" {...props}
    //  role="button" 
    //  tabIndex="0"
     >
      <Nav variant="tabs" defaultActiveKey="/">
        <Nav.Item>
          <Nav.Link id="home" href="/">Research Stocks</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link id="portfolio" eventKey="portfolio" href="/portfolio">Portfolio</Nav.Link><span className="sr-only">(current)</span>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="detail" href="/detail">Detail</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="scenarios" href="/scenarios">Scenarios</Nav.Link>
        </Nav.Item>
      </Nav>
    </span>
  );
}

// export default Tabs;
