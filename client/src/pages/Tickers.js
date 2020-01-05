import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Input, NotesArea, FormBtn } from "../components/Form";
// import { tickerChart } from "../components/Charts";
import { mixedChart } from 'react-chartjs-2';

const moment = require("moment");

class Tickers extends Component {
  state = {
    tickers: [],
    tickerSearch: ""
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

  // deleteTicker = id => {
  //   API.deleteTicker(id)
  //     .then(res => this.loadStocks())
  //     .catch(err => console.log(err));
  // };

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

  handleFormSubmit = async event => {
    event.preventDefault();
    console.log("START");
    console.log("this: ", this);
    //Check validation on the following line (may need to be different from ticker example)
    if (this.state.tickerSearch) {
      let tickerData = this.state.tickerSearch;

      var startDate = (moment().format("MM")) + "/"
        + (moment().format("DD")) + "/"
        + (moment().format("YYYY"));

      // Convert to seconds
      startDate = parseInt((moment(startDate) / 1000));
      console.log("startDate: " + startDate);

      let dateNowSeconds = parseInt((moment() / 1000));
      console.log("dateNowSeconds: " + dateNowSeconds);


      console.log("****tickerData: ", tickerData, " ****");
      let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-historical-data?frequency=1d&filter=history&period1=1546405200&period2=1578020649&symbol=" + tickerData,
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
          "x-rapidapi-key": "7eb729d91fmshd56769216684858p17fff1jsna4991481e499"
        }
      }

      console.log("queryURL: " + settings.url);

      const chartResponse = await fetch(settings.url, settings)
      console.log(chartResponse.json());
      console.log("chartResponse: ", chartResponse);

      // Populating the different chart areas

      var priceResults = [];
      var volResults = [];
      var dayDate = [];
      var Chart = [];

      // var ctx = document.getElementById('myChart' + chartsDivRef).getContext('2d');
      var ctx = document.getElementById('myChart1-1').getContext('2d');

      console.log("ctx: " + ctx);
      // for (var i = (chartResponse.prices.length - 1); i > 0; i--) {
      //   priceResults.push(chartResponse.prices[i].close);
      //   volResults.push(chartResponse.prices[i].volume / 1000000);
      //   dayDate.push(moment((chartResponse.prices[i].date) * 1000).format("MMM Do YY"));
      // }

      // console.log("priceResults: " + priceResults);
      // console.log("volResults: " + volResults);
      // console.log("dayDate: " + dayDate);


    };
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

            <div className="container">
              <div id="tickerOutput" className="card card-default">
                <div className="row" id="graphRow1">
                  <div className="col-sm-12 col-md-6 col-lg-4">
                    <div className="row" id="tickerChartHeader1-1"></div>
                    <div className="row" id="periodButtons1-1"></div>
                    <div className="row" id="tickerChart1-1">
                      <canvas id="myChart1-1" width="200" height="200">
                        {/* <mixedChart data={
        type: 'bar',
        data: {
          datasets: [{
            label: 'Volume (mil.)',
            //Adding in 2nd axis
            yAxisID: 'B',
            backgroundColor: 'darkblue',
            data: volResults
          }, {
            label: 'Stock Price (US$)',
            //Adding in 2nd axis
            yAxisID: 'A',
            backgroundColor: 'green',
            data: priceResults,
            type: 'line'
          }],
          labels: dayDate
        },
        options: {
          scales: {
            yAxes: [{
              id: 'A',
              type: 'linear',
              position: 'left',
              labelString: 'Stock Price (US$)',
            }, {
              id: 'B',
              //   type: 'linear',
              position: 'right',
              labelString: 'Volume',
              ticks: {
                // max: 1,
                // min: 0
              }
            }]
          }
        }
      }/> */}
                      </canvas>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-4">
                    <div className="row" id="tickerChartHeader1-2"></div>
                    <div className="row" id="periodButtons1-2"></div>
                    <div className="row" id="tickerChart1-2">
                      <canvas id="myChart1-2" width="200" height="200"></canvas>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-4">
                    <div className="row" id="tickerChartHeader1-3"></div>
                    <div className="row" id="periodButtons1-3"></div>
                    <div className="row" id="tickerChart1-3">
                      <canvas id="myChart1-3" width="200" height="200"></canvas>
                    </div>
                  </div>
                </div>
                <div className="row" id="graphRow2">
                  <div className="col-sm-12 col-md-6 col-lg-4">
                    <div className="row" id="tickerChartHeader2-1"></div>
                    <div className="row" id="periodButtons2-1"></div>
                    <div className="row" id="tickerChart2-1">
                      <canvas id="myChart1-1" width="200" height="200"></canvas>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-4">
                    <div className="row" id="tickerChartHeader2-2"></div>
                    <div className="row" id="periodButtons2-2"></div>
                    <div className="row" id="tickerChart2-2">
                      <canvas id="myChart1-2" width="200" height="200"></canvas>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-4">
                    <div className="row" id="tickerChartHeader2-3"></div>
                    <div className="row" id="periodButtons2-3"></div>
                    <div className="row" id="tickerChart2-3">
                      <canvas id="myChart1-3" width="200" height="200"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </Col>
        </Row>
      </Container>
    );
  }
}

export default Tickers;
