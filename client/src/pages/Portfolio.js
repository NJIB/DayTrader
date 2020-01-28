import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Input, NotesArea, FormBtn } from "../components/Form";
import { InputGroup } from 'react-bootstrap';

const moment = require("moment");

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

  componentDidMount() {
    this.loadStocks();
    this.loadStockSummary();
    console.log("this: ", this);
  }

  loadStocks = () => {
    API.getTickers()
      .then(res =>
        this.setState({ tickers: res.data, ticker: "", quantity: "", notes: "" })
      )
      .catch(err => console.log(err));
  };

  loadStockSummary = () => {
    API.getTickerSummary()
      .then(res =>
        this.setState({ tickerSummary: res.data })
      )
      .catch(err => console.log(err));
  };

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
          cost: totalCost,
          averageprice: this.state.transactionprices
        })
          .then(res => this.loadStocks())
          .catch(err => console.log(err));
      } else
        if (updateFlag === true) {
          const summaryUpdate = {
            ticker: tickerInput,
            quantity: totalHeld,
            cost: totalCost,
            averageprice: pricePerShare,
            _id: ""
          };

          this.state.tickerSummary.forEach(id => {
            console.log("id.ticker: ", id.ticker, " | tickerInput: ", tickerInput)            
            if (id.ticker === tickerInput){
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
                  <th scope={'col'} style={{ width: '15%' }}>Purch. Price</th>
                  {/* <th scope={'col'} style={{ width: '10%' }}>Compare</th> */}
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
                      <td scope={'col'} style={{ width: '20%' }}>
                        <Link to={"/tickers/" + ticker._id}>
                          <strong>
                            {ticker.ticker}
                          </strong>
                        </Link>
                      </td>
                      <td scope={'col'} style={{ width: '15%' }}>
                        {ticker.transactiontype}
                      </td>
                      <td scope={'col'} style={{ width: '15%' }}>
                        {ticker.quantity}
                      </td>
                      <td scope={'col'} style={{ width: '15%' }}>
                        {moment(ticker.transactiondate).format("MM/DD/YYYY")}
                      </td>
                      <td scope={'col'} style={{ width: '15%' }}>
                        ${ticker.transactionprice}
                      </td>
                      {/* <td scope={'col'} style={{ width: '10%' }}> */}
                      {/* <InputGroup className="mb-3"> */}
                      {/* <InputGroup.Prepend> */}
                      {/* <InputGroup.Checkbox aria-label="Checkbox for following text input" /> */}
                      {/* </InputGroup.Prepend> */}
                      {/* </InputGroup> */}
                      {/* </td> */}
                      <td scope={'col'} style={{ width: '10%' }}>
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
