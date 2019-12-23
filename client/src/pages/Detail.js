import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

class Detail extends Component {
  state = {
    ticker: {}
  };
  // Add code to get the ticker with an _id equal to the id in the route param
  // e.g. http://localhost:3000/tickers/:id
  // The ticker id for this route can be accessed using this.props.match.params.id

  componentDidMount() {
    API.getTicker(this.props.match.params.id)
      .then(res => this.setState({ ticker: res.data }))
      .catch(err => console.log(err));
  }


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {this.state.ticker.title} by {this.state.ticker.author}
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>Notes</h1>
              <p>{this.state.ticker.notes}</p>
            </article>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Summary View</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
