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
    tickerSearch: "",
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

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   //Check validation on the following line (may need to be different from ticker example)
  //   if (this.state.ticker && this.state.quantity) {
  //     API.getTickerInfo({
  //       ticker: this.state.tickerSearch
  //     })
  //       .then(res => this.loadStocks())
  //       .catch(err => console.log(err));
  //   }
  // };

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
      <Container fluid className='SearchPane'>
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
                    value={this.state.tickerSearch}
                    onChange={this.handleInputChange}
                    name="tickerSearch"
                    placeholder="Stock Ticker"
                  />
                </Col>
                <Col size="md-1">
                  <FormBtn
                    disabled={!(this.state.tickerSearch)}
                    onClick={this.handleFormSubmit}
                  >
                    Search
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

export default Tickers;
