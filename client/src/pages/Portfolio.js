import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, NotesArea, FormBtn } from "../components/Form";
import { InputGroup } from 'react-bootstrap';

class Portfolio extends Component {
  state = {
    tickers: [],
    ticker: "",
    quantity: "",
    transactionprice: "",
    transactiondate: "",
    customRadioInline1: null,
    customRadioInline2: null,
    notes: ""
  };

  componentDidMount() {
    this.loadStocks();
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

  handleFormSubmit = event => {
    event.preventDefault();
    //Check validation on the following line (may need to be different from ticker example)
    if (this.state.ticker && this.state.quantity) {
      if (document.getElementById('rbSell').checked) {
        console.log("Sell rb checked");
        this.state.quantity = (this.state.quantity * -1);
      }
      else {
        console.log("Buy rb checked");
      }

      console.log(this.state.quantity);

      API.saveTicker({
        ticker: this.state.ticker,
        quantity: this.state.quantity,
        transactionprice: this.state.transactionprice,
        transactiondate: this.state.transactiondate,
        notes: this.state.notes
      })
        .then(res => this.loadStocks())
        .catch(err => console.log(err));
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
              <h1>Add Stock / Transaction to Portfolio:</h1>
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
                  {/* <div className="rbBuy custom-control custom-radio custom-control-inline">
                    <input type="radio" id="customRadioInline1" name="customRadioInline1" className="custom-control-input" value="Buy" />
                    <label className="custom-control-label" for="customRadioInline1">Buy</label>
                  </div> */}
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
                  {/* <div className="rbSell custom-control custom-radio custom-control-inline">
                    <input type="radio" id="customRadioInline2" name="customRadioInline1" className="custom-control-input" />
                    <label className="custom-control-label" for="customRadioInline2">Sell</label>
                  </div> */}

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
          {/* <Col size="md-6 sm-12"> */}
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h3>Stocks Being Tracked</h3>
            </Jumbotron>

            <table className={'table'} style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th scope={'col'} style={{ width: '30%' }}>Ticker</th>
                  <th scope={'col'} style={{ width: '30%' }}>Quantity</th>
                  <th scope={'col'} style={{ width: '30%' }}>X</th>
                </tr>
              </thead>
            </table>

            {this.state.tickers.length ? (
              <List>
                {this.state.tickers.map(ticker => (
                  <ListItem key={ticker._id}>
                    <Link to={"/tickers/" + ticker._id}>
                      <strong>
                        {ticker.ticker}
                      </strong>
                    </Link>

                    {ticker.quantity}

                    <DeleteBtn onClick={() => this.deleteTicker(ticker._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h2>No Results to Display</h2>
              )}

          </Col>
        </Row>
      </Container>
    );
  }
}

export default Portfolio;
