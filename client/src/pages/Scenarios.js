import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Input, NotesArea, FormBtn } from "../components/Form";
import { InputGroup } from 'react-bootstrap';

class Scenarios extends Component {
  state = {
    tickers: [],
  };

  async componentDidMount() {
    await this.loadStocks();
    console.log("this.state: ", this.state);
    this.getAveragePrices();
  }

  loadStocks = () => {
    return API.getTickers()
      .then(res =>
        this.setState({ tickers: res.data, ticker: "", quantity: "", notes: "" })
      )
      .catch(err => console.log(err));
  };

    getAveragePrices = () => {
      console.log("$$$ COLLATING TRANSACTIONS BY TICKER $$$")

  //Add together volumes and price records for individual tickers

  const stockPriceAverages = [{
    ticker: this.state.tickers.ticker,
    transactions: [{
      price: this.state.tickers.transactionprice,
      volume: this.state.tickers.quantity,
      transDate: this.state.tickers.transactiondate
    }]
}];

  this.state.tickers.forEach(tickerSumm => {
    console.log("tickerSumm: ", tickerSumm);
  
    const tickerKey = tickerSumm.ticker;
    console.log("tickerKey: ", tickerKey);
    // if (stockPriceAverages.ticker.indexOf(tickerKey)){
    //     stockPriceAverages.transactions.volume = (stockPriceAverages.transactions.volume + tickerSumm.volume);
    //   console.log(stockPriceAverages.ticker," : ", stockPriceAverages.ticker.volume, " units");
    // } else {
    //   console.log("Searching for ticker ", tickerKey, " and nothing found!");
    // };
  });
}

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
      {/* <Row> */}
        {/* <Col size="md-6"> */}
        {/* <Col size="md-12">
          <Jumbotron>
            <h2>Add Stock / Transaction to Portfolio:</h2>
          </Jumbotron>
          <form>
            <Row>
              <Col size="md-2">
                <Input
                  value={this.state.ticker}
                  onChange={this.handleInputChange}
                  name="ticker"
                  placeholder="Ticker"
                />
              </Col>
              <Col size="md-1">
                <Input
                  value={this.state.quantity}
                  onChange={this.handleInputChange}
                  name="quantity"
                  placeholder="Qty"
                />
              </Col>
              <Col size="md-1">
                <Input
                  onChange={this.handleInputChange}
                  name="transactionprice"
                  placeholder="Price"
                />
              </Col>
              <Col size="md-2">
                <Input
                  // value={this.state.quantity}
                  onChange={this.handleInputChange}
                  name="transactiondate"
                  placeholder="Date"
                />
              </Col>
              <Col size="md-1">
                <InputGroup>
                  <InputGroup.Radio aria-label="Buy" id="rbBuy" />
                  <label>Buy</label>
                </InputGroup>
              </Col>
              <Col size="md-1">
                <InputGroup>
                  <InputGroup.Radio aria-label="Sell" id="rbSell" />
                  <label>Sell</label>
                </InputGroup>
              </Col>
              <Col size="md-3">
                <NotesArea
                  value={this.state.notes}
                  onChange={this.handleInputChange}
                  name="notes"
                  placeholder="Notes (Optional)"
                />
              </Col>
              <Col size="md-1">
                <FormBtn
                  disabled={!(this.state.quantity && this.state.ticker)}
                  onClick={this.handleFormSubmit}
                >
                  Save
              </FormBtn>
              </Col>
            </Row>
          </form>
        </Col>
      </Row> */}

      <Row>
        {/* <Col size="md-6 sm-12"> */}
        <Col size="md-12 sm-12">
          <Jumbotron>
            <h3>Stocks Being Tracked</h3>
          </Jumbotron>

          <table className={'table'} style={{ width: '100%' }}>
            {/* <table responsive> */}
            {/* <thead style={{ width: '100%' }}> */}
            <thead>
              <tr>
                <th scope={'col'} style={{ width: '20%' }}>Ticker</th>
                <th scope={'col'} style={{ width: '20%' }}>Quantity</th>
                <th scope={'col'} style={{ width: '20%' }}>Avg. Price</th>
                <th scope={'col'} style={{ width: '20%' }}>Compare</th>
                <th scope={'col'} style={{ width: '5%' }}>Delete</th>
              </tr>
            </thead>
            {/* </table> */}
            <tbody>
              {this.state.tickers.length ?
                // // <List>
                // <tr>
                this.state.tickers.map(ticker => (
                  // <ListItem key={ticker._id}>
                  <tr>
                    <td scope={'col'} style={{ width: '20%' }}>
                      <Link to={"/tickers/" + ticker._id}>
                        <strong>
                          {ticker.ticker}
                        </strong>
                      </Link>
                    </td>
                    <td scope={'col'} style={{ width: '20%' }}>
                      {ticker.quantity}
                    </td>
                    <td scope={'col'} style={{ width: '20%' }}>
                      {"Avg. price calc"}
                    </td>
                    <td scope={'col'} style={{ width: '20%' }}>
                      {"Compare checkbox"}
                    </td>
                    <td scope={'col'} style={{ width: '5%' }, { textAlign: "center" }}>
                      <DeleteBtn onClick={() => this.deleteTicker(ticker._id)} />
                    </td>
                  </tr>
                  // </ListItem>

                ))
                // </tr>

                // </List>

                : (
                  <h2>No Results to Display</h2>
                )}
            </tbody>
          </table>


        </Col>
      </Row>
    </Container>
  );
}
}

export default Scenarios;
