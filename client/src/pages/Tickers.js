import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, NotesArea, FormBtn } from "../components/Form";

class Tickers extends Component {
  state = {
    tickers: [],
    ticker: "",
    quantity: "",
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
      API.saveTicker({
        ticker: this.state.ticker,
        quantity: this.state.quantity,
        notes: this.state.notes
      })
        .then(res => this.loadStocks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          {/* <Col size="md-6"> */}
          <Col size="md-12">
            <Jumbotron>
              <h1>Which Stock Tickers Do You Want To Track?</h1>
            </Jumbotron>
            <form>
              <Row>
                <Col size="md-2">
                  <Input
                    value={this.state.ticker}
                    onChange={this.handleInputChange}
                    name="ticker"
                    placeholder="Stock Ticker"
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
                <Col size="md-2">
                  <Input
                    // value={this.state.quantity}
                    onChange={this.handleInputChange}
                    name="transactiondate"
                    placeholder="Date"
                  />
                </Col>
                <Col size="md-1">
                  <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="customRadioInline1" name="customRadioInline1" class="custom-control-input" />
                    <label class="custom-control-label" for="customRadioInline1">Buy</label>
                  </div>
                </Col>
                <Col size="md-1">
                  <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="customRadioInline2" name="customRadioInline1" class="custom-control-input" />
                    <label class="custom-control-label" for="customRadioInline2">Sell</label>
                  </div>

                </Col>
                <Col size="md-4">
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
              <h1>Stocks Being Tracked</h1>
            </Jumbotron>
            {/* Inserting table headers */}
            <table style={{ width: '100%', border: '1px solid black' }}>
              <tr>
                <th>Ticker</th>
                <th>Quantity</th>
                <th>Notes</th>
              </tr>
            </table>
            {this.state.tickers.length ? (
              <List>
                {this.state.tickers.map(ticker => (
                  //Insert table here
                  <ListItem key={ticker._id}>
                    <Link to={"/tickers/" + ticker._id}>
                      <strong>
                        {ticker.ticker} {ticker.quantity}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteTicker(ticker._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Tickers;
