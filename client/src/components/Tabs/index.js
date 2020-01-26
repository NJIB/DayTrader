import React, { useState } from "react";
import { Nav } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function Tabs(props) {
  const initialPath = props.location.pathname.split("/");
  const [selectedLink, setSelectedLink] = useState(initialPath[initialPath.length - 1]);

  return (
    <span className="tabsGroup" {...props}
    //  role="button" 
    //  tabIndex="0"
    >
      <Nav variant="tabs" activeKey={selectedLink} defaultActiveKey={selectedLink}>
        <Nav.Item>
          <Nav.Link id="home" eventKey="tickers" href="/tickers" onClick={() => setSelectedLink("/tickers")}>Research Stocks</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link id="portfolio" eventKey="portfolio" href="/portfolio" onClick={() => setSelectedLink("portfolio")}>Portfolio</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          {/* <Nav.Link id="detail" eventKey="detail" href="/detail" onClick={() => setSelectedLink("detail")}>Detail</Nav.Link>
        </Nav.Item>
        <Nav.Item> */}
          <Nav.Link id="scenarios" eventKey="scenarios" href="/scenarios" onClick={() => setSelectedLink("scenarios")}>Scenarios</Nav.Link>
        </Nav.Item>
      </Nav>
    </span>
  );
}

export default withRouter(Tabs);
