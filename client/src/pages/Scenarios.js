import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Input, NotesArea, FormBtn } from "../components/Form";
import { InputGroup } from 'react-bootstrap';


class Scenarios extends Component {
  state = {
    ticker: "",
    tickerSummary: [],
    scenarioData: []
  };

  async componentDidMount() {
    await this.loadStockSummary();

    console.log("this: ", this);

    this.getTickerPrices();
  }

  loadStockSummary = async () => {
    const res = await API.getTickerSummary();
    this.setState({ tickerSummary: res.data })
  };

  getTickerPrices = async _ => {
    console.log("Looping through tickerSummary data for API call");

    console.log("this (in getTickerPrices function): ", this);

    const promises = this.state.tickerSummary.map(tickerKey => {
      let tickerData = tickerKey.ticker;
      console.log("****tickerData: ", tickerData, " ****");

      let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-financials?symbol=" + tickerData,
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
          "x-rapidapi-key": "e3f35368bdmsheaf36be3f76863bp1b27c9jsn06d6a302ff59"
        }
      }

      const latestPrice = fetch(settings.url, settings)
      return latestPrice;
    })

    const responseData = await Promise.all(promises);

    const priceOutputs = await responseData.map(async item => {
      const resolvedItem = await item.json();
      return resolvedItem;
    })

    console.log("priceOutputs; ", priceOutputs);
    const resolvedPriceOutputs = await Promise.all(priceOutputs);
    console.log("resolvedPriceOutputs; ", resolvedPriceOutputs);

//NJIB test
const scenarios = [];

const promises2 = this.state.tickerSummary.map(destination => {
  const scenario = {
    cost: 0,
    quantity: 0,
    averageprice: 0,
    _id: "",
    ticker: "",
    quantity: 0,
    date: "",
    symbol: "",
    latestprice: 0
  };

  scenario.cost = destination.cost;
  scenario.quantity = destination.quantity;
  scenario.averageprice = destination.averageprice;
  scenario._id = destination._id;
  scenario.ticker = destination.ticker;
  scenario.date = destination.date;
  scenarios.push(scenario);

        resolvedPriceOutputs.forEach(latestPriceInfo => {
        if (scenario.ticker === latestPriceInfo.price.symbol) {
          scenario.symbol = latestPriceInfo.price.symbol;
          scenario.latestprice = latestPriceInfo.price.regularMarketPrice.fmt;
        }
      });


  return scenario;
})

const collatedData = await Promise.all(promises2);
console.log("responseData2; ", collatedData);

    // this.setState({ scenarioData: resolvedPriceOutputs });
    this.setState({ scenarioData: collatedData });
    console.log("this: ", this);
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // Handle button click
  handleFormSubmit = event => {
    event.preventDefault();
    // this.state.tickerSummary.forEach(id => {
    //   console.log("id.ticker: ", id.ticker, " | tickerInput: ", tickerInput)
    //   if (id.ticker === tickerInput) {
    //     summaryUpdate._id = id._id;
    //   }
    // })

  };


  render() {
    return (
      // <Container fluid className='SearchPane'>
      <Container fluid>
        <Row>
          {/* <Col size="md-6"> */}
          <Col size="md-12">
            <Jumbotron>
              <h2>Investment Scenarios</h2>
            </Jumbotron>
            <form>
              <Row>
                <Col size="md-2">
                  <Input
                    value={this.state.ticker}
                    onChange={this.handleInputChange}
                    name="ticker"
                    placeholder="$ Amount to be invested"
                  />
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
                    Submit
              </FormBtn>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>

        <Row>
          {/* <Col size="md-6 sm-12"> */}
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h3>Average Stock Prices:</h3>
            </Jumbotron>

            <table className={'table'} style={{ width: '100%' }}>
              {/* <table responsive> */}
              {/* <thead style={{ width: '100%' }}> */}
              <thead>
                <tr>
                  <th scope={'col'} style={{ width: '15%' }}>Ticker</th>
                  <th scope={'col'} style={{ width: '15%' }}>Quantity</th>
                  <th scope={'col'} style={{ width: '15%' }}>Average Price</th>
                  <th scope={'col'} style={{ width: '15%' }}>Today's Price</th>
                  <th scope={'col'} style={{ width: '15%' }}>Projected Quantity</th>
                  <th scope={'col'} style={{ width: '15%' }}>Projected Avge. Price</th>
                  <th scope={'col'} style={{ width: '10%' }}>Trade</th>
                </tr>
              </thead>
              {/* </table> */}
              <tbody>
              {/* {this.state.tickerSummary.length ? */}
                {this.state.scenarioData.length ?
                  // // <List>
                  // <tr>
                  this.state.scenarioData.map(ticker => (
                    // <ListItem key={ticker._id}>
                    <tr>
                      <td scope={'col'} style={{ width: '15%' }}>
                        <Link to={"/tickers/" + ticker._id}>
                          <strong>
                            {ticker.ticker}
                          </strong>
                        </Link>
                      </td>
                      <td scope={'col'} style={{ width: '15%' }}>
                        {ticker.quantity}
                      </td>
                      <td scope={'col'} style={{ width: '15%' }}>
                        ${ticker.averageprice}
                      </td>
                      <td scope={'col'} style={{ width: '15%' }}>
                        ${ticker.latestprice}
                      </td>
                      <td scope={'col'} style={{ width: '15%' }}>
                        {ticker.projectedQuantity}
                      </td>
                      <td scope={'col'} style={{ width: '15%' }}>
                        ${ticker.projectedAvgePrice}
                      </td>
                      <td scope={'col'} style={{ width: '15%' }}>
                        <InputGroup className="mb-3">
                          <InputGroup.Prepend>
                            <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                          </InputGroup.Prepend>
                        </InputGroup>
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
};


export default Scenarios;
