import React, {useState} from "react";
import { Nav } from 'react-bootstrap';
import "./style.css";
import {withRouter} from 'react-router-dom';

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function Tabs(props) {
  const initialPath = props.location.pathname.split("/");
  const [selectedLink, setSelectedLink] = useState(initialPath[initialPath.length-1]);

  return (
    <span className="tabsGroup" {...props}
    //  role="button" 
    //  tabIndex="0"
     >
      <Nav variant="tabs" activeKey={selectedLink} defaultActiveKey={selectedLink}>
        <Nav.Item>
          <Nav.Link id="home" href="/" >Research Stocks</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link id="portfolio" eventKey="portfolio" href="/portfolio" onClick={ () => setSelectedLink("portfolio")}>Portfolio</Nav.Link><span className="sr-only">(current)</span>
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

export default withRouter(Tabs);
