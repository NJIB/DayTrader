import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Input } from "../components/Form";
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
    this.setState({ scenarioData: collatedData });
    console.log("this: ", this);

    const investmentScenario = this.state.scenarioData;
    console.log("investmentScenario: ", investmentScenario);

    const investmentOptions = [];

    investmentScenario.map(async projected => {
      let calcValue = (await this.state.investmentAmount * 1);
      console.log("calcValue: ", calcValue);
      let costNum = (await projected.cost * 1);
      console.log("costNum: ", costNum);
      let quantityNum = (await projected.quantity * 1);
      console.log("quantityNum: ", quantityNum);
      let latestPriceNum = (await projected.latestprice * 1);
      console.log("latestPriceNum: ", latestPriceNum);
      let latestValue = (await projected.latestprice * projected.quantity).toFixed(2);
      console.log("latestValue: ", projected.latestprice, " * ", projected.quantity, " = ", latestValue);
      console.log("latestValue: ", latestValue);
      let gainLoss = await ((projected.quantity * latestPriceNum) - projected.cost).toFixed(2);
      console.log("gainLoss: ", gainLoss);

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
        gainloss: gainLoss,
      };
      console.log("investmentOption (in map loop): ", investmentOption);
      investmentOptions.push(investmentOption);
      console.log("investmentOptions: ", investmentOptions);

      this.setState({ investmentScenarios: investmentOptions });
      console.log("this: ", this);
    });
  };

  handleInputChange = async event => {
    const { name, value } = event.target;
    console.log("name: ", name, " | value: ", value);

    if (name === 'investmentAmount') {
      await this.setState({
        [name]: value
      });
    } else {
      const scenarioPrice = value;
      console.log("scenarioPrice: ", value);
      this.setState({
        [name]: value
      });
    }

    // await this.setState({
    //   [name]: value
    // });

    const investmentScenario = this.state.scenarioData;
    console.log("investmentScenario: ", investmentScenario);

    const investmentOptions = [];

    investmentScenario.map(async projected => {

      let calcValue = (this.state.investmentAmount * 1);
      console.log("calcValue: ", calcValue);
      let costNum = (projected.cost * 1);
      console.log("costNum: ", costNum);
      let quantityNum = (projected.quantity * 1);
      console.log("quantityNum: ", quantityNum);
      let latestPriceNum = (projected.latestprice * 1);
      console.log("latestPriceNum: ", latestPriceNum);

      // NJIB Test 02/04
      if (name === projected.symbol) {
        let scenarioPrice;
        console.log("scenarioPrice: ", scenarioPrice);
      } else {
        let scenarioPriceId = name;
        console.log("scenarioPriceId: ", scenarioPriceId);
        let scenarioPrice = value;
        console.log("scenarioPrice: ", scenarioPrice);
      }


      // this.state.scenarioPrice_+projected.ticker = this.scenarioPrice_;
      // console.log(scenarioPrice_+projected.ticker);
      // if () {
      // let scenarioPriceIdValue = { scenarioPriceId };
      // console.log("scenarioPriceIdValue: ", scenarioPriceIdValue);
      // console.log("scenarioPrice: ", calcValue % ('this.state.scenarioPrice_'+projected.ticker));
      // let calcValueModulo = (calcValue % 'this.state.scenarioPrice_'+projected.ticker);
      // console.log("calcValueModulo: ", calcValueModulo);  
      // } else
      // let calcValueModulo = (calcValue % latestPriceNum).toFixed(2);
      // console.log("calcValueModulo: ", calcValueModulo);
      // }
      // NJIB End Test 02/04

      let calcValueModulo = (calcValue % latestPriceNum).toFixed(2);
      console.log("calcValueModulo: ", calcValueModulo);
      let newCost = (costNum += ((calcValue - calcValueModulo) * 1)).toFixed(2);
      console.log("newCost: ", newCost);
      let latestValue = (projected.latestprice * projected.quantity).toFixed(2);
      console.log("latestValue: ", latestValue);
      let gainLoss = ((projected.quantity * latestPriceNum) - projected.cost).toFixed(2);
      console.log("gainLoss: ", gainLoss);
      let newQuantity = (quantityNum += ((calcValue - calcValueModulo) / latestPriceNum) * 1).toFixed(2);
      console.log("newQuantity: ", newQuantity);
      let newAveragePrice = (newCost / newQuantity).toFixed(2);
      console.log("newAveragePrice: ", newAveragePrice);
      let avgePriceChg = (newAveragePrice / projected.averageprice).toFixed(2);
      console.log("avgePriceChg: ", avgePriceChg);


      const investmentOption = {
        cost: projected.cost,
        quantity: projected.quantity,
        averageprice: projected.averageprice,
        _id: projected._id,
        ticker: projected.ticker,
        date: projected.date,
        symbol: projected.symbol,
        latestprice: projected.latestprice,
        // scenariopriceid: scenarioPriceId,
        // scenarioprice: scenarioPrice,
        latestvalue: latestValue,
        gainloss: gainLoss,
        newcost: newCost,
        newquantity: newQuantity,
        newaverageprice: newAveragePrice,
        avgepricechg: avgePriceChg
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
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h2>Investment Scenarios</h2>
            </Jumbotron>
            <form>
              <Row>
                <Col size="md-4">
                  <Input
                    value={this.state.investment}
                    onChange={this.handleInputChange}
                    name="investmentAmount"
                    placeholder="$ Amount to be invested"
                  />
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
        <Row>
          {/* <Col size="md-6 sm-12"> */}
          <Col size="md-12 sm-12">
            <table responsive className={'table'} style={{ width: '100%' }}>
              {/* <table responsive> */}
              {/* <thead style={{ width: '100%' }}> */}
              <thead>
                <tr>
                  {/* <th scope={'col'} style={{ width: '15%' }}>Ticker</th>
                  <th scope={'col'} style={{ width: '15%' }}>Quantity</th>
                  <th scope={'col'} style={{ width: '15%' }}>Average Price</th>
                  <th scope={'col'} style={{ width: '20%' }}>Cost</th>
                  <th scope={'col'} style={{ width: '15%' }}>Today's Price</th>
                  <th scope={'col'} style={{ width: '20%' }}>Today's Value</th>
                  <th scope={'col'} style={{ width: '15%' }}>Gain/Loss</th>
                  <th scope={'col'} style={{ width: '15%' }}>Projected Qty.</th>
                  <th scope={'col'} style={{ width: '15%' }}>Proj. Total Value</th>
                  <th scope={'col'} style={{ width: '15%' }}>Proj. Avge. Price</th>
                  <th scope={'col'} style={{ width: '10%' }}>Trade</th> */}

                  <th scope={'col'} >Ticker</th>
                  <th scope={'col'} >Quantity</th>
                  <th scope={'col'} >Average Price</th>
                  <th scope={'col'} >Cost</th>
                  <th scope={'col'} >Today's Price</th>
                  <th scope={'col'} >Scenario Price</th>
                  <th scope={'col'} >Today's Value</th>
                  <th scope={'col'} >Gain/Loss</th>
                  <th scope={'col'} >Proj. Qty.</th>
                  <th scope={'col'} >Proj. Total Value</th>
                  <th scope={'col'} >Proj. Avge. Price</th>
                  <th scope={'col'} >Avge. Price Chg.</th>
                  <th scope={'col'} >Trade</th>

                </tr>
              </thead>
              <tbody>
                {this.state.investmentScenarios.length ?
                  this.state.investmentScenarios.map(ticker => (
                    <tr>
                      <td scope={'col'} >
                        <Link to={"/tickers/" + ticker._id}>
                          <strong>
                            {ticker.ticker}
                          </strong>
                        </Link>
                      </td>
                      <td scope={'col'} >
                        {ticker.quantity}
                      </td>
                      <td scope={'col'} >
                        ${ticker.averageprice}
                      </td>
                      <td scope={'col'} >
                        ${ticker.cost}
                      </td>
                      <td scope={'col'} >
                        ${ticker.latestprice}
                      </td>
                      <td scope={'col'} >
                        <Input style={{ width: '100px' }}
                          value={this.state.scenarioPrice}
                          // disabled={!(this.state.investmentAmount)}
                          onChange={this.handleInputChange}
                          name={ticker.ticker}
                          // name={"scenarioPrice"}
                          placeholder="$---"
                        />
                      </td>
                      <td scope={'col'} >
                        ${ticker.latestvalue}
                      </td>
                      <td scope={'col'} >
                        ${ticker.gainloss}
                      </td>
                      <td scope={'col'} >
                        {this.state.investmentAmount ?
                          ticker.newquantity
                          : (
                            <p>***</p>
                          )}
                      </td>
                      <td scope={'col'} >
                        {this.state.investmentAmount ?
                          <p>${ticker.newcost}</p>
                          : (
                            <p>***</p>
                          )}
                      </td>
                      <td scope={'col'} >
                        {this.state.investmentAmount ?
                          <p>${ticker.newaverageprice}</p>
                          : (
                            <p>***</p>
                          )}
                      </td>
                      <td scope={'col'} >
                        {this.state.investmentAmount ?
                          <p>{ticker.avgepricechg}%</p>
                          : (
                            <p>***</p>
                          )}
                      </td>

                      <td scope={'col'} >
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
