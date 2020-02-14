import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { List, ListItem } from "../components/List";

import "./styles/style.css";

// const axios = require("axios");
// const cheerio = require('cheerio');
const moment = require("moment");

class Detail extends Component {
  state = {
    ticker: {},
    news: {
      items: {
        result: []
      }
    },
    tickers: [],
    tickerSummary: [],
    transactions: []
  };

  async componentDidMount() {
    this.loadStocks();
    
    this.loadStockSummary();

    const result = await API.getTicker(this.props.match.params.id);
    this.setState({ ticker: result.data });

    this.getTickerNews(result.data.ticker);

    this.getTickerTransactions(result.data.ticker);
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

  getTickerNews = async ticker => {
    //Ticker News API
    var tickerNews = {
      "async": true,
      "crossDomain": true,
      "url": `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-news?region=US&lang=en&category=${ticker}`,
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "x-rapidapi-key": "7eb729d91fmshd56769216684858p17fff1jsna4991481e499"
      }
    }

    const tickerNewsResponse = await fetch(tickerNews.url, tickerNews)

    const tickerNewsOutput = await tickerNewsResponse.json();
    console.log(tickerNewsOutput)

    this.setState({ news: tickerNewsOutput });
    console.log("this.state: ", this.state);

    // NJIB test
    // this.state.news.items.result.map(story => {
    //   console.log(story.title);
    //   console.log(story.link);
    // });

    //NJIB test
    // this.state.news.items.result.forEach(story => {
    //   console.log(story.title)
    // });
  }

  getTickerTransactions = async result => {
    const tickerInput = this.state.ticker.ticker;
    console.log("tickerInput: ", tickerInput);

    let tickerAllTransactions = [];

    this.state.tickers.forEach(transaction => {
      if (transaction.ticker === tickerInput) {
        const tickerTransactions = {
          ticker: transaction.ticker,
          quantity: transaction.quantity,
          transactionprice: transaction.transactionprice,
          transactiondate: transaction.transactiondate,
          transactiontype: transaction.transactiontype,
          notes: transaction.notes
        }

        tickerAllTransactions.push(tickerTransactions);
      }
    })
    this.setState({ transactions: tickerAllTransactions });
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {this.state.ticker.ticker}
              </h1>
            </Jumbotron>
          </Col>
        </Row>

        <Row>
          <Col size="md-7 md-offset-1" className="card card-default">
            <article>
              <h3>Your Trades on this Stock:</h3>
              <table className={'table'} style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th scope={'col'} style={{ width: '25%' }}>Trans. Date</th>
                    <th scope={'col'} style={{ width: '25%' }}>Action</th>
                    <th scope={'col'} style={{ width: '25%' }}>Quantity</th>
                    <th scope={'col'} style={{ width: '25%' }}>Purch. Price</th>
                  </tr>
                </thead>
                <tbody>

                  {this.state.transactions.length ?
                    this.state.transactions.map(transactions => (
                      <tr>
                        <td style={{ width: '25%' }}>
                          {moment(transactions.transactiondate).format("MM/DD/YYYY")}
                        </td>
                        <td style={{ width: '25%' }}>
                          {transactions.transactiontype}
                        </td>
                        <td style={{ width: '25%' }}>
                          {transactions.quantity}
                        </td>
                        <td style={{ width: '25%' }}>
                          ${transactions.transactionprice}
                        </td>
                      </tr>
                    ))
                    : (
                      <h2>No Results to Display</h2>
                    )}
                    
                    {/* <tr>
                      {this.state.tickerSummary.map(summary => (
                        summary.ticker = this.state.transactions.ticker ?
                        <p>Average purchase price: {summary.averageprice}
                        </p>
                        : (
                          <p>No summary data available</p>
                        )
                      ))}
                    </tr> */}

                </tbody>
              </table>

            </article>
          </Col>
          <Col size="md-5 md-offset-1" className="card card-default">
            <article>
              <h3>News about {this.state.ticker.ticker}:</h3>
              {this.state.news.items.result.length ? (
                <List>
                  {this.state.news.items && this.state.news.items.result.map(story => (
                    <ListItem>
                      <a href={story.link} target="_blank" rel="noopener noreferrer" className="headlines">
                        {story.title} ({story.publisher})
                      </a>
                    </ListItem>
                  ))}
                </List>
              ) : (
                  <p>No News Items to Display</p>
                )}

            </article>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/portfolio">← Back to Portfolio View</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
