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
    scenarioData: [],
    investmentScenarios: []
  };
  async componentDidMount() {
    await this.loadStockSummary();
    console.log("this: ", this);
    this.getTickerPrices();
  }
  loadStockSummary = async () => {
    const res = await API.getTickerSummary();
    this.setState({ tickerSummary: res.data })
  };
  getTickerPrices = async _ => {
    console.log("Looping through tickerSummary data for API call");
    console.log("this (in getTickerPrices function): ", this);
    const promises = this.state.tickerSummary.map(tickerKey => {
      let tickerData = tickerKey.ticker;
      console.log("****tickerData: ", tickerData, " ****");
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
    const priceOutputs = await responseData.map(async item => {
      const resolvedItem = await item.json();
      return resolvedItem;
    })
    console.log("priceOutputs; ", priceOutputs);
    const resolvedPriceOutputs = await Promise.all(priceOutputs);
    console.log("resolvedPriceOutputs; ", resolvedPriceOutputs);

    //NJIB test
    const scenarios = [];
    const collatedData = this.state.tickerSummary.map(destination => {
      const scenario = {
        cost: 0,
        quantity: 0,
        averageprice: 0,
        _id: "",
        ticker: "",
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
    console.log("collatedData; ", collatedData);
    //  this.setState({ scenarioData: resolvedPriceOutputs });
    this.setState({ scenarioData: collatedData });
    console.log("this: ", this);

    // NJIB Test 02/03
    const investmentScenario = this.state.scenarioData;
    console.log("investmentScenario: ", investmentScenario);

    const investmentOptions = [];

    investmentScenario.map(async projected => {
      // const projectedNumbers = this.state.scenarioData;
      // console.log("projectedNumbers (before calcs): ", projectedNumbers);
      let calcValue = (await this.state.investmentAmount * 1);
      console.log("calcValue: ", calcValue);
      // NOT CURRENTLY CALCULATING CORRECTLY
      let costNum = (await projected.cost * 1);
      console.log("costNum: ", costNum);
      let newCost = await (costNum += (calcValue * 1));
      console.log("projected.cost: ", projected.cost);
      console.log("newCost: ", newCost);
      let quantityNum = (await projected.quantity * 1);
      console.log("quantityNum: ", quantityNum);
      let latestPriceNum = (await projected.latestprice * 1);
      console.log("latestPriceNum: ", latestPriceNum);
      let latestValue = (await projected.latestprice * projected.quantity).toFixed(2);
      console.log("latestValue: ",projected.latestprice, " * ",projected.quantity, " = ",latestValue);
      console.log("latestValue: ", latestValue);
      let newQuantity = await Math.round(quantityNum += (calcValue / projected.latestprice));
      console.log("newQuantity: ", newQuantity);
      let newAveragePrice = await (newCost / newQuantity).toFixed(2);
      console.log("newAveragePrice: ", newAveragePrice);

      const investmentOption = {
        cost: projected.cost,
        quantity: projected.quantity,
        averageprice: projected.averageprice,
        _id: projected._id,
        ticker: projected.ticker,
        date: projected.date,
        symbol: projected.symbol,
        latestprice: projected.latestprice,
        latestvalue: latestValue,
        newcost: newCost,
        newquantity: newQuantity,
        newaverageprice: newAveragePrice
      };
      console.log("investmentOption (in map loop): ", investmentOption);
      investmentOptions.push(investmentOption);
      console.log("investmentOptions: ", investmentOptions);

      this.setState({ investmentScenarios: investmentOptions });
      console.log("this: ", this);
    });

    // NJIB End Test 02/03
  };

  handleInputChange = async event => {
      const { name, value } = event.target;
    // console.log("name: ", name, " | value: ", value);
    await this.setState({
      [name]: value
    });

    const investmentScenario = this.state.scenarioData;
    console.log("investmentScenario: ", investmentScenario);

    const investmentOptions = [];

    investmentScenario.map(async projected => {
      let calcValue = (this.state.investmentAmount * 1);
      console.log("calcValue: ", calcValue);
      let costNum = (await projected.cost * 1);
      console.log("costNum: ", costNum);
      let newCost = await (costNum += (calcValue * 1));
      console.log("projected.cost: ", projected.cost);
      console.log("newCost: ", newCost);
      let quantityNum = (await projected.quantity * 1);
      console.log("quantityNum: ", quantityNum);
      let latestPriceNum = (await projected.latestprice * 1);
      console.log("latestPriceNum: ", latestPriceNum);
      let latestValue = (await projected.latestprice * projected.quantity).toFixed(2);
      console.log("latestValue: ", latestValue);
      let newQuantity = await Math.round(quantityNum += (calcValue / projected.latestprice));
      console.log("newQuantity: ", newQuantity);
      let newAveragePrice = await (newCost / newQuantity).toFixed(2);
      console.log("newAveragePrice: ", newAveragePrice);

      const investmentOption = {
        cost: projected.cost,
        quantity: projected.quantity,
        averageprice: projected.averageprice,
        _id: projected._id,
        ticker: projected.ticker,
        date: projected.date,
        symbol: projected.symbol,
        latestprice: projected.latestprice,
        latestvalue: latestValue,
        newcost: newCost,
        newquantity: newQuantity,
        newaverageprice: newAveragePrice
      };
      console.log("investmentOption (in map loop): ", investmentOption);
      investmentOptions.push(investmentOption);
      console.log("investmentOptions: ", investmentOptions);

      this.setState({ investmentScenarios: investmentOptions });
      console.log("this: ", this);
    });

    // End Test 02/03
  };
  // Handle button click
  handleFormSubmit = async event => {
    event.preventDefault();
    // this.state.tickerSummary.forEach(id => {
    //   console.log("id.ticker: ", id.ticker, " | tickerInput: ", tickerInput)
    //   if (id.ticker === tickerInput) {
    //     summaryUpdate._id = id._id;
    //   }
    // })
    const investmentScenario = this.state.scenarioData;
    console.log("investmentScenario: ", investmentScenario);

    const investmentOptions = [];

    investmentScenario.map(async projected => {
      // const projectedNumbers = this.state.scenarioData;
      // console.log("projectedNumbers (before calcs): ", projectedNumbers);
      let calcValue = (await this.state.investmentAmount * 1);
      console.log("calcValue: ", calcValue);
      let costNum = (await projected.cost * 1);
      console.log("costNum: ", costNum);
      let newCost = await (costNum += (calcValue * 1));
      console.log("projected.cost: ", projected.cost);
      console.log("newCost: ", newCost);
      let quantityNum = (await projected.quantity * 1);
      console.log("quantityNum: ", quantityNum);
      let latestPriceNum = (await projected.latestprice * 1);
      console.log("latestPriceNum: ", latestPriceNum);
      let latestValue = (await projected.latestprice * projected.quantity).toFixed(2);
      console.log("latestValue: ", latestValue);
     
      let newQuantity = await Math.round(quantityNum += (calcValue / projected.latestprice));
      console.log("newQuantity: ", newQuantity);
      let newAveragePrice = await (newCost / newQuantity).toFixed(2);
      console.log("newAveragePrice: ", newAveragePrice);

      const investmentOption = {
        cost: projected.cost,
        quantity: projected.quantity,
        averageprice: projected.averageprice,
        _id: projected._id,
        ticker: projected.ticker,
        date: projected.date,
        symbol: projected.symbol,
        latestprice: projected.latestprice,
        latestvalue: latestValue,
        newcost: newCost,
        newquantity: newQuantity,
        newaverageprice: newAveragePrice
      };
      console.log("investmentOption (in map loop): ", investmentOption);
      investmentOptions.push(investmentOption);
      console.log("investmentOptions: ", investmentOptions);

      this.setState({ investmentScenarios: investmentOptions });
      console.log("this: ", this);
    });
  };

  render() {
    return (
      // <Container fluid className='SearchPane'>
      <Container fluid>
        <Row>
          {/* <Col size="md-6"> */}
          <Col size="md-12">
            <Jumbotron>
              <h2>Investment Scenarios</h2>
            </Jumbotron>
            <form>
              <Row>
                <Col size="md-2">
                  <Input
                    value={this.state.investment}
                    onChange={this.handleInputChange}
                    name="investmentAmount"
                    placeholder="$ Amount to be invested"
                  />
                </Col>
                <Col size="md-3">
                  <NotesArea
                    value={this.state.notes}
                    onChange={this.handleInputChange}
                    name="notes"
                    placeholder="Notes (Optional)"
                  />
                </Col>
                <Col size="md-1">
                  <FormBtn
                    disabled={!(this.state.investmentAmount)}
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
          {/* <Col size="md-6 sm-12"> */}
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h3>Average Stock Prices:</h3>
            </Jumbotron>
            <table className={'table'} style={{ width: '100%' }}>
              {/* <table responsive> */}
              {/* <thead style={{ width: '100%' }}> */}
              <thead>
                <tr>
                  <th scope={'col'} style={{ width: '15%' }}>Ticker</th>
                  <th scope={'col'} style={{ width: '15%' }}>Quantity</th>
                  <th scope={'col'} style={{ width: '15%' }}>Average Price</th>
                  <th scope={'col'} style={{ width: '20%' }}>Cost</th>
                  <th scope={'col'} style={{ width: '15%' }}>Today's Price</th>
                  <th scope={'col'} style={{ width: '20%' }}>Today's Value</th>
                  <th scope={'col'} style={{ width: '15%' }}>Gain/Loss</th>
                  <th scope={'col'} style={{ width: '15%' }}>Projected Quantity</th>
                  <th scope={'col'} style={{ width: '15%' }}>Projected Avge. Price</th>
                  <th scope={'col'} style={{ width: '10%' }}>Trade</th>
                </tr>
              </thead>
              {/* </table> */}
              <tbody>
                {this.state.investmentScenarios.length ?
                  this.state.investmentScenarios.map(ticker => (
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
                      <td scope={'col'} style={{ width: '20%' }}>
                        ${ticker.cost}
                      </td>
                      <td scope={'col'} style={{ width: '15%' }}>
                        ${ticker.latestprice}
                      </td>
                      <td scope={'col'} style={{ width: '20%' }}>
                        ${ticker.latestvalue}
                      </td>
                      <td scope={'col'} style={{ width: '15%' }}>
                        ${ticker.cost}
                      </td>
                      <td scope={'col'} style={{ width: '15%' }}>
                        {this.state.investmentAmount ?
                          ticker.newquantity
                          : (
                            <p>***</p>
                          )}
                      </td>
                      <td scope={'col'} style={{ width: '15%' }}>
                      {this.state.investmentAmount ?
                          <p>${ticker.newaverageprice}</p>
                          : (
                            <p>***</p>
                          )}

                        {/* ${ticker.newaverageprice} */}
                      </td>
                      <td scope={'col'} style={{ width: '15%' }}>
                        <InputGroup className="mb-3">
                          <InputGroup.Prepend>
                            <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                          </InputGroup.Prepend>
                        </InputGroup>
                      </td>
                    </tr>
                  ))
                  : (
                    <h2>No Results to Display</h2>
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
