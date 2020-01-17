import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { List, ListItem } from "../components/List";

import "./styles/style.css";

const axios = require("axios");
const cheerio = require('cheerio');

class Detail extends Component {
  state = {
    ticker: {},
    news: {
      items: {
        result: []
      }
    }
  };

  async componentDidMount() {
    const result = await API.getTicker(this.props.match.params.id)
    this.setState({ ticker: result.data })
    this.getTickerNews(result.data.ticker);
  }

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

    console.log("url: " + tickerNews.url);

    const tickerNewsResponse = await fetch(tickerNews.url, tickerNews)

    const tickerNewsOutput = await tickerNewsResponse.json();
    console.log(tickerNewsOutput)

    this.setState({ news: tickerNewsOutput });
    // console.log("this.state.news.items.result.length: ", this.state.news.items.result.length);
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
          <Col size="md-6 md-offset-1" class="card card-default">
            <article>
              <h3>Notes</h3>
              <p>{this.state.ticker.notes}</p>
            </article>
          </Col>
          <Col size="md-6 md-offset-1" class="card card-default">
            <article>
              <h3>Ticker News</h3>
              {this.state.news.items.result.length ? (
                <List>
                  {this.state.news.items && this.state.news.items.result.map(story => (
                    <ListItem>
                      <a href={story.link} target="_blank"  className="headlines">
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
            <Link to="/">← Back to Summary View</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
