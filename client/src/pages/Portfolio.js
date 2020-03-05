import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Input, NotesArea, FormBtn } from "../components/Form";
import { InputGroup } from 'react-bootstrap';

const moment = require("moment");

let tickersToBeLookedUp = [];
let apiCallCounter = 0;

class Portfolio extends Component {
  state = {
    tickers: [],
    tickerSummary: [],
    ticker: "",
    quantity: 0,
    transactionprice: 0,
    transactiondate: "",
    transactiontype: "",
    customRadioInline: "Buy",
    notes: "",
    summary: {
      ticker: "",
      quantity: 0,
      cost: 0,
      averageprice: 0,
      _id: ""
    }
  };

  async componentDidMount() {
    // componentDidMount() {
    await this.loadStocks();
    // await this.loadStockSummary();
    this.loadStockSummary();
    console.log("this: ", this);

    this.getTickerPrices();

  }

  // NJIB This code would load stocks, but getTickerPrices would not work (would not await)
  // loadStocks = () => {
  //   API.getTickers()
  //     .then(res =>
  //       this.setState({ tickers: res.data, ticker: "", quantity: "", notes: "" })
  //     )
  //     .catch(err => console.log(err));
  // };
  // NJIB Function above replaced with the function below - it now works

  loadStocks = async () => {
    const res = await API.getTickers();
    this.setState({ tickers: res.data, ticker: "", quantity: "", notes: "" })
  };


  loadStockSummary = () => {
    API.getTickerSummary()
      .then(res =>
        this.setState({ tickerSummary: res.data })
      )
      .catch(err => console.log(err));
  };

  // NJIB Latest Stock Prices obtained - NOT QUITE WORKING (NOT LOOPING THROUGH ON THE  MAP)
  getTickerPrices = async _ => {
    console.log("Looping through tickers data for API call");
    console.log("this (in getTickerPrices function): ", this);

    let latestPrices = [];

    // let tickersToBeLookedUp = [];
    // console.log("tickersToBeLookedUp: ", tickersToBeLookedUp);

    // const promises = this.state.tickers.map(tickerKey => {
    this.state.tickers.map(tickerKey => {

      let tickerData = tickerKey.ticker;
      console.log("****tickerData: ", tickerData, " ****");
      apiCallCounter++;
      console.log("apiCallCounter: ", apiCallCounter);

      if (tickersToBeLookedUp.includes(tickerData)) {
        console.log("!!! ", tickerData, " already in array !!!")
      } else {
        tickersToBeLookedUp.push(tickerData);
      }
      console.log("tickersToBeLookedUp: ", tickersToBeLookedUp);
    });

    const promises = tickersToBeLookedUp.map(tickerData => {
      // const promises = tickersToBeLookedUp.map(tickerData => {
        let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-financials?symbol=" + tickerData,
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
          "x-rapidapi-key": "e3f35368bdmsheaf36be3f76863bp1b27c9jsn06d6a302ff59"
        // },
        // latestPrice: function() {
        //   return this;
        }
      }

      // const unboundApiCall = settings.latestPrice;
      // const boundApiCall = unboundApiCall.bind(settings);
      // const boundApiCallURL = boundApiCall().url;
      // const boundApiCallsettings = boundApiCall();
      // console.log("boundApiCallsettings: ", boundApiCall());
      // console.log("boundApiCallURL: ", boundApiCallURL);
      // const latestPrice = fetch.bind(boundApiCallURL [boundApiCallsettings]) ;

      const latestPrice = fetch(settings.url, settings)
      // const latestPrice = fetch.bind(boundApiCallURL, boundApiCallsettings);
      // const latestPrice = setTimeout(fetch.bind(boundApiCallURL, boundApiCallsettings),1000);
      return latestPrice;
      // return boundApiCall;
    })

    const responseData = await Promise.all(promises);
    console.log("responseData: ", responseData);

    const priceOutputs = responseData.map(async item => {
      // const priceOutputs =await responseData.map(async item => {
      const resolvedItem = await item.json();
      console.log("resolvedItem: ", resolvedItem);
      return resolvedItem;
    })
    console.log("priceOutputs; ", priceOutputs);
    const resolvedPriceOutputs = await Promise.all(priceOutputs);
    console.log("resolvedPriceOutputs; ", resolvedPriceOutputs);

    const collatedData = this.state.tickers.map(destination => {
      const latestPrice = {
        ticker: "",
        actiontype: "",
        quantity: 0,
        transactiondate: "",
        transactionprice: 0,
        latestprice: 0,
        gainlossnum: 0,
        gainlosspct: 0
      };
      latestPrice.ticker = destination.ticker;
      latestPrice.transactiontype = destination.transactiontype;
      latestPrice.quantity = destination.quantity;
      latestPrice.transactiondate = destination.transactiondate;
      latestPrice.transactionprice = destination.transactionprice;

      latestPrices.push(latestPrice);
      console.log("latestPrices added to: ", latestPrices);

      resolvedPriceOutputs.forEach(latestPriceInfo => {
        if (latestPrice.ticker === latestPriceInfo.price.symbol) {
          latestPrice.latestprice = latestPriceInfo.price.regularMarketPrice.fmt;
          latestPrice.gainlossnum = (latestPriceInfo.price.regularMarketPrice.fmt - destination.transactionprice).toFixed(2);
          // console.log("gainlossnum: ", latestPrice.gainlossnum);
          latestPrice.gainlosspct = (((latestPriceInfo.price.regularMarketPrice.fmt / destination.transactionprice) - 1) * 100).toFixed(2);
          // console.log("gainlosspct: ", latestPrice.gainlosspct);

        }
      });
      return latestPrice;
    })
    console.log("collatedData; ", collatedData);
    this.setState({ tickers: collatedData });
    console.log("this: ", this);

  };

  //   listTickers = tickers => {
  //   console.log("tickersToBeLookedUp: " + tickersToBeLookedUp);

  //   // const promises = this.state.tickers.map(tickerKey => {
  //     this.state.tickers.map(tickerKey => {

  //     let tickerData = tickerKey.ticker;
  //     console.log("****tickerData: " + tickerData + " ****");
  //     apiCallCounter++;
  //     console.log("apiCallCounter: " + apiCallCounter);

  //     if (tickersToBeLookedUp.includes(tickerData)){
  //       console.log("!!! " + tickerData + " already in array !!!")
  //     } else {
  //     tickersToBeLookedUp.push(tickerData);
  //     };
  //     console.log("tickersToBeLookedUp: " + tickersToBeLookedUp);
  //   }
  // };

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

  // Handle button click
  handleFormSubmit = event => {
    event.preventDefault();
    let transactiontype;
    if (this.state.ticker && this.state.quantity) {
      if (document.getElementById('rbSell').checked) {
        console.log("Sell rb checked");
        this.state.quantity = (this.state.quantity * -1);
        this.state.transactiontype = "Sold";
        console.log("Transactiontype: ", transactiontype);
      }
      else {
        console.log("Buy rb checked");
        this.state.transactiontype = "Bought";
      }

      // Save record to the Tickers table
      API.saveTicker({
        ticker: this.state.ticker,
        transactiontype: this.state.transactiontype,
        quantity: this.state.quantity,
        transactionprice: this.state.transactionprice,
        transactiondate: this.state.transactiondate,
        notes: this.state.notes
      })
        .then(res => this.loadStocks())
        .catch(err => console.log(err));

      // Get TickerSummary details for this ticker
      // This variable holds the input value
      const tickerInput = this.state.ticker;
      console.log("tickerInput: ", tickerInput);

      // Capture quantity purchased from input line
      let quantityInput = this.state.quantity;
      console.log("quantityInput: ", quantityInput);

      // Use as counter of total volume held as loop through state object (initializing with input value, as this is not yet in state object)
      let totalHeld = parseInt(quantityInput);
      // let totalHeld = 0;

      // Capture cost from input line
      let totalCost = (this.state.transactionprice * quantityInput);
      console.log("totalCost: ", totalCost);

      // Initialize average price var
      let pricePerShare = 0;

      let updateFlag = false;

      const portfolioList = this.state;
      console.log("portfolioList: ", portfolioList);

      const latestInputs = {
        transactionprice: this.state.transactionprice,
        transactiondate: this.state.transactiondate,
        transactiontype: this.state.transactiontype,
        notes: this.state.notes,
        ticker: tickerInput,
        quantity: quantityInput
      }
      console.log("latestInputs: ", latestInputs);

      // portfolioList.tickers.push(latestInputs);
      // console.log("portfolioList: ", portfolioList);

      // this.setState({ tickers: portfolioList });
      // console.log("this.state (after update): ", this.state);

      // Loop through state and see if ticker already exists
      this.state.tickers.forEach(occurence => {
        console.log("occurence.ticker: ", occurence.ticker, " | tickerInput: ", tickerInput);
        if (occurence.ticker !== tickerInput) {
        } else
          if (occurence.ticker === tickerInput) {
            console.log("Existing record found!");
            updateFlag = true;

            console.log("totalHeld before: ", totalHeld);
            console.log("occurence.quantity before: ", occurence.quantity);
            totalHeld = totalHeld += parseInt(occurence.quantity);
            console.log("totalHeld after: ", totalHeld);

            totalCost = (totalCost + (occurence.quantity * occurence.transactionprice));
            pricePerShare = (totalCost / totalHeld).toFixed(2);
            console.log("ticker:", occurence.ticker, " | totalHeld: ", totalHeld, " | totalCost: ", totalCost, " | pricePerShare: ", pricePerShare);
          }
      })
      if (updateFlag === false) {
        console.log("Creating new summary record");

        API.saveTickerSummary({
          // ticker: this.state.ticker,
          ticker: tickerInput,
          quantity: this.state.quantity,
          cost: totalCost.toFixed(2),
          averageprice: this.state.transactionprice
        })
          .then(res => this.loadStocks())
          .catch(err => console.log(err));
      } else
        if (updateFlag === true) {
          const summaryUpdate = {
            ticker: tickerInput,
            quantity: totalHeld,
            cost: totalCost.toFixed(2),
            averageprice: pricePerShare,
            _id: ""
          };

          this.state.tickerSummary.forEach(id => {
            console.log("id.ticker: ", id.ticker, " | tickerInput: ", tickerInput)
            if (id.ticker === tickerInput) {
              summaryUpdate._id = id._id;
            }
          })
          console.log("_id found: ", summaryUpdate._id);

          console.log("summaryUpdate (complete): ", summaryUpdate);

          API.updateTickerSummary({
            id: summaryUpdate._id,
            ticker: summaryUpdate.ticker,
            quantity: summaryUpdate.quantity,
            cost: summaryUpdate.cost,
            averageprice: summaryUpdate.averageprice,
          })
            .then(res => this.loadStocks())
            .catch(err => console.log(err));
        }
    }
  };

  render() {
    return (
      // <Container fluid className='SearchPane'>
      <Container fluid>
        <Row>
          {/* <Col size="md-6"> */}
          <Col size="md-12">
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
                    onChange={this.handleInputChange}
                    name="transactiondate"
                    placeholder="Date"
                  />
                </Col>
                <Col size="md-1">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Radio checked={this.state.customRadioInline === "Buy" ? true : false} onChange={() => this.setState({ customRadioInline: "Buy" })} aria-label="Buy" id="rbBuy" />
                      <label>Buy</label>
                    </InputGroup.Prepend>
                  </InputGroup>
                </Col>
                <Col size="md-1">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Radio checked={this.state.customRadioInline === "Sell" ? true : false} onChange={() => this.setState({ customRadioInline: "Sell" })} aria-label="Sell" id="rbSell" />
                      <label>Sell</label>
                    </InputGroup.Prepend>
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
        </Row>

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
                  <th scope={'col'} style={{ width: '15%' }}>Action</th>
                  <th scope={'col'} style={{ width: '15%' }}>Quantity</th>
                  <th scope={'col'} style={{ width: '15%' }}>Trans. Date</th>
                  <th scope={'col'} style={{ width: '15%' }}>Trans. Price</th>
                  <th scope={'col'} style={{ width: '15%' }}>Latest Price</th>
                  <th scope={'col'} style={{ width: '15%' }}>Gain/Loss</th>
                  <th scope={'col'} style={{ width: '10%' }}>Delete</th>
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
                      <td style={{ width: '20%' }}>
                        <Link to={"/tickers/" + ticker._id}>
                          <strong>
                            {ticker.ticker}
                          </strong>
                        </Link>
                      </td>
                      <td style={{ width: '15%' }}>
                        {ticker.transactiontype}
                      </td>
                      <td style={{ width: '15%' }}>
                        {ticker.quantity}
                      </td>
                      <td style={{ width: '15%' }}>
                        {moment(ticker.transactiondate).format("MM/DD/YYYY")}
                      </td>
                      <td style={{ width: '15%' }}>
                        ${ticker.transactionprice}
                      </td>
                      <td style={{ width: '15%' }}>
                        ${ticker.latestprice}
                      </td>
                      <td style={{ width: '15%' }}>
                        {ticker.gainlosspct}%
                      </td>

                      {/* <td style={{ width: '10%' }}> */}
                      {/* <InputGroup className="mb-3"> */}
                      {/* <InputGroup.Prepend> */}
                      {/* <InputGroup.Checkbox aria-label="Checkbox for following text input" /> */}
                      {/* </InputGroup.Prepend> */}
                      {/* </InputGroup> */}
                      {/* </td> */}
                      <td style={{ width: '10%' }}>
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

export default Portfolio;
