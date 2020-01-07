import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Input, NotesArea, FormBtn } from "../components/Form";
// import { Chart } from "../components/Charts";
import { Bar, Line, Pie, Mixedchart } from 'react-chartjs-2';

const moment = require("moment");

class Tickers extends Component {
  state = {
    tickers: [],
    tickerSearch: "",

    chartData: {
      labels: ['A', 'B', 'C', 'D', 'E', 'F'],
      datasets: [{
        label: 'Population',
        data: [
          617594,
          181045,
          153060,
          106519,
          105162,
          95072
        ],
        backgroundColor: 'grey'
      }]
    }

  };

  componentDidMount() {
    this.loadStocks();
  }

  loadStocks = () => {
    API.getTickers()
      .then(res =>
        // this.setState({ tickers: res.data, ticker: "", quantity: "", notes: "" })
        this.setState({ tickers: res.data })
      )
      .catch(err => console.log("getTickers error: ", err));
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
          // "x-rapidapi-key": process.env.apiKey
        }
      }

      console.log("queryURL: " + settings.url);

      const chartResponse = await fetch(settings.url, settings)

      const responseData = await chartResponse.json();
      console.log("responseData: ", responseData);

      // Populating the different chart areas

      var priceResults = [];
      var volResults = [];
      var dayDate = [];
      var Chart = [];

      // var ctx = document.getElementById('myChart' + chartsDivRef).getContext('2d');
      // var ctx = document.getElementById('myChart1-1').getContext('2d');

      // console.log("ctx: " + ctx);
      for (var i = (responseData.prices.length - 1); i > 0; i--) {
        priceResults.push(responseData.prices[i].close);
        volResults.push(responseData.prices[i].volume / 1000000);
        dayDate.push(moment((responseData.prices[i].date) * 1000).format("MMM Do YY"));
      }

      console.log("priceResults: " + priceResults);
      console.log("volResults: " + volResults);
      console.log("dayDate: " + dayDate);

      const localChartData = {
        labels:
          dayDate,
        datasets: [{
          label: tickerData,
          data: priceResults,
          backgroundColor: 'grey'
        }]
      }
  
      this.setState({chartData: localChartData});
    };
  };

  render() {
    return (
      <Container fluid className='SearchPane'>
        <Row>
          {/* <Col size="md-6"> */}
          <Col size="md-12">
            <Jumbotron>
              <h3>Which Stock Tickers Do You Want To Track?</h3>
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
        </Row>

        <Row>
          {/* <Col size="md-12 sm-12"> */}
          <div className="chart">
            <Bar
              data={this.state.chartData}
              width={400}
              height={250}
              options={{ maintainAspectRatio: false }}
            />
          </div>
          {/* <Chart /> */}

          {/* <div id="tickerOutput" className="card card-default">
                <div className="row" id="graphRow1">
                  <div className="col-sm-12 col-md-6 col-lg-4">
                    <div className="row" id="tickerChartHeader1-1"></div>
                    <div className="row" id="periodButtons1-1"></div>
                    <div className="row" id="tickerChart1-1">
                      <canvas id="myChart1-1" width="200" height="200">
                        Test
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

 */}
          {/* </Col> */}
        </Row>
      </Container>
    );
  }
}

export default Tickers;
