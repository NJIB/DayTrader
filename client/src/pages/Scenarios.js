import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";

class Scenarios extends Component {
  state = {
    tickers: [],
  };

  async componentDidMount() {
    await this.loadStocks();
    console.log("this.state: ", this.state);
    // this.getAveragePrices();
  }

  loadStocks = () => {
    return API.getTickers()
      .then(res =>
        this.setState({ tickers: res.data, ticker: "", quantity: "", notes: "" })
      )
      .catch(err => console.log(err));
  };

  // getAveragePrices = () => {
  //   console.log("$$$ COLLATING TRANSACTIONS BY TICKER $$$")

  //   //Add together volumes and price records for individual tickers
  //   // Declare temporary variables to sum inputs

  //   //Holds all the totals for setting State
  //   let averagePrices = this.state;
  //   console.log("averagePrices: ", averagePrices);

  //   // //Temporary object for each iteration
  //   // let stockAveragePrices = this.state;
  //   // console.log("stockAveragePrices: ", stockAveragePrices);

  //   let quantityCounter = 0;

  //   this.state.tickers.forEach(tickerSumm => {
  //     console.log("tickerSumm: ", tickerSumm);

  //   //Temporary object for each iteration
  //   let stockAveragePrices = {
  //     tickerTotals: [],
  //   };
  //   console.log("stockAveragePrices: ", stockAveragePrices);

  //     const tickerKey = tickerSumm.ticker;
  //     console.log("tickerKey: ", tickerKey);

  //     if (tickerKey === tickerSumm.ticker) {
  //       quantityCounter = (quantityCounter + tickerSumm.quantity);
  //       console.log("quantityCounter: ", quantityCounter);

  //     } else {
  //       console.log("Searching for ticker ", tickerKey, " and nothing found!");
  //     };

  //     averagePrices.tickerTotals.push(stockAveragePrices.tickerTotals);
  //     console.log("averagePrices: ", averagePrices)

  //   });
  // }

  deleteTicker = id => {
    API.deleteTicker(id)
      .then(res => this.loadStocks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  render() {
    return (
      // <Container fluid className='SearchPane'>
      <Container fluid>
        <span>Header inputs (as required)</span>
        <Row>
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h3>Average Prices:</h3>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}


export default Scenarios;
