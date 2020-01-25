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
    ticker: "",
    quantity: "",
    transactionprice: "",
    transactiondate: "",
    customRadioInline: "Buy",
    notes: ""
  };

  componentDidMount() {
    this.loadStocks();
    console.log("this: ", this);
  }

  loadStocks = () => {
    API.getTickers()
      .then(res =>
        this.setState({ tickers: res.data, ticker: "", quantity: "", notes: "" })
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
    if (this.state.ticker && this.state.quantity) {
      if (document.getElementById('rbSell').checked) {
        console.log("Sell rb checked");
        this.state.quantity = (this.state.quantity * -1);
      }
      else { console.log("Buy rb checked");
    }

      // Save record to the Tickers table
      API.saveTicker({
        ticker: this.state.ticker,
        transactionType: this.state.customRadioInline,
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

      let sharesHeld = this.state.quantity;
      console.log("sharesHeld: ", sharesHeld);

      let totalCost = (this.state.transactionprice * sharesHeld);
      console.log("totalCost: ", totalCost);

      let pricePerShare = 0;

      // Loop through state and see if ticker already exists
      this.state.tickers.forEach(occurence => {
        if (occurence.ticker === tickerInput) {
          console.log("Existing record found!")

          sharesHeld = sharesHeld =+ occurence.quantity;
          totalCost = (totalCost +(occurence.quantity * occurence.transactionprice)); 
          pricePerShare = (totalCost/sharesHeld);
          console.log("sharesHeld: ", sharesHeld, " | totalCost: ", totalCost, " \ pricePerShare: ", pricePerShare);
          
          // Update the TickerSummary via a PUT statement
            API.updateTickerSummary({
            id: this.state.tickers._id,
            ticker: this.state.ticker,
            quantity: sharesHeld,
            cost: totalCost,  //NEED TO ADD TO THIS EXISTING (PUT?)
            averageprice: (totalCost / sharesHeld),  //LOGIC TO BE ADDED
            user: "Nick",  //TO BE UPDATED
          })
            .then(res => this.loadStocks())
            .catch(err => console.log(err));
        } else {
          // Otherwise save a new record to the TickerSummary table
          API.saveTickerSummary({
            ticker: this.state.ticker,
            quantity: this.state.quantity,
            cost: this.state.transactionprice,  //NEED TO ADD TO THIS EXISTING (PUT?)
            averageprice: 0,  //LOGIC TO BE ADDED
            user: "Nick",  //TO BE UPDATED
          })
            .then(res => this.loadStocks())
            .catch(err => console.log(err));
        }
      })
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
                    // value={this.state.quantity}
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
                        {ticker.customRadioInline}
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
                      <td scope={'col'} style={{ width: '10%' }, { textAlign: "center" }}>
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
