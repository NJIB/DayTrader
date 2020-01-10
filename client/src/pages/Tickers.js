import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Input, NotesArea, FormBtn } from "../components/Form";
import { Bar, Line, Pie, Mixedchart } from 'react-chartjs-2';
import PeriodBtns from "../components/PeriodBtns";
import DeleteChartBtn from "../components/DeleteChartBtn";
import "./styles/style.css";

const moment = require("moment");

class Tickers extends Component {
  state = {
    tickers: [],
    tickerSearch: "",

    chartData: {
      labels: [],
      datasets: [{
        label: '',
        data: [],
        backgroundColor: 'grey'
      }]
    }

  };

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "bottom",
    maintainAspectRatio: true
  }

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

      // var ctx = document.getElementById('myChart' + chartsDivRef).getContext('2d');
      // var ctx = document.getElementById('myChart1-1').getContext('2d');

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
        datasets: [
          {
            label: "Stock Price",
            type: 'line',
            // yAxisID: "y-axis-1",
            data: priceResults,
            backgroundColor: 'grey',
            pointRadius: '1px'
          },
          {
            label: "Volume",
            // yAxisID: "y-axis-2",
            data: volResults,
            backgroundColor: 'green',
            y2axis: true
          }
        ],
        options: {
          legendPosition: "bottom"
        }
      }


      this.setState({ chartData: localChartData });
    };
  };

  render() {
    return (
      <Container fluid className='SearchPane'>
        <div id="tickerSearch" class="card card-default">
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
        </div>
        <div id="tickerOutput" class="card card-default">
          <Row>
            <div class="row" id="graphRow1">
              <div class="col-sm-12 col-md-6 col-lg-4">
                <div class="row" id="tickerChartHeader1-1">{this.state.tickerSearch}</div>
                <div class="row" id="tickerChart1-1">
                  {/* <canvas id="myChart1-1" width="200" height="200"> */}
                  <div className="chart">
                    <Bar
                      data={this.state.chartData}
                      width={200}
                      height={200}
                    // options={{
                    //   responsive: true,
                    //   title: { display: this.props.displayTitle },
                    //   maintainAspectRatio: this.props.maintainAspectRatio,
                    //   legendPosition: "bottom"

                    // scales: {
                    //   xAxes: [
                    //     {
                    //       display: true,
                    //       gridLines: {
                    //         display: false
                    //       },
                    //       labels: {
                    //         show: true
                    //       }
                    //     }
                    //   ],
                    //   yAxes: [
                    //     {
                    //       type: 'linear',
                    //       display: true,
                    //       position: 'left',
                    //       id: 'y-axis-1',
                    //       gridLines: {
                    //         display: false
                    //       },
                    //       labels: {
                    //         show: true
                    //       }
                    //     },
                    //     {
                    //       type: 'linear',
                    //       display: true,
                    //       position: 'right',
                    //       id: 'y-axis-2',
                    //       gridLines: {
                    //         display: false
                    //       },
                    //       labels: {
                    //         show: true
                    //       }
                    //     }
                    //   ]
                    // }
                    // }}
                    />
                    <PeriodBtns />
                    <DeleteChartBtn />
                  </div>
                  {/* </canvas> */}
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-4">
                <div class="row" id="tickerChartHeader1-2"></div>
                <div class="row" id="tickerChart1-2">
                  {/* <canvas id="myChart1-1" width="200" height="200"> */}
                  <div className="chart">
                    <Bar
                      data={this.state.chartData}
                      width={200}
                      height={200}
                    // options={{
                    //   responsive: true,
                    //   title: { display: this.props.displayTitle },
                    //   maintainAspectRatio: this.props.maintainAspectRatio,
                    //   legendPosition: "bottom"

                    // scales: {
                    //   xAxes: [
                    //     {
                    //       display: true,
                    //       gridLines: {
                    //         display: false
                    //       },
                    //       labels: {
                    //         show: true
                    //       }
                    //     }
                    //   ],
                    //   yAxes: [
                    //     {
                    //       type: 'linear',
                    //       display: true,
                    //       position: 'left',
                    //       id: 'y-axis-1',
                    //       gridLines: {
                    //         display: false
                    //       },
                    //       labels: {
                    //         show: true
                    //       }
                    //     },
                    //     {
                    //       type: 'linear',
                    //       display: true,
                    //       position: 'right',
                    //       id: 'y-axis-2',
                    //       gridLines: {
                    //         display: false
                    //       },
                    //       labels: {
                    //         show: true
                    //       }
                    //     }
                    //   ]
                    // }
                    // }}
                    />
                    <PeriodBtns />
                    <DeleteChartBtn />
                  </div>
                  {/* </canvas> */}
                </div>
              </div>

              {/* <div class="col-sm-12 col-md-6 col-lg-4">
                <div class="row" id="tickerChartHeader1-2"></div>
                <div class="row" id="periodButtons1-2"></div>
                <div class="row" id="tickerChart1-2">
                  <canvas id="myChart1-2" width="200" height="200"></canvas>
                </div>
              </div> */}
              <div class="col-sm-12 col-md-6 col-lg-4">
                <div class="row" id="tickerChartHeader1-3"></div>
                <div class="row" id="periodButtons1-3"></div>
                <div class="row" id="tickerChart1-3">
                  <canvas id="myChart1-3" width="200" height="200"></canvas>
                </div>
              </div>
            </div>
            <div class="row" id="graphRow2">
              <div class="col-sm-12 col-md-6 col-lg-4">
                <div class="row" id="tickerChartHeader2-1"></div>
                <div class="row" id="periodButtons2-1"></div>
                <div class="row" id="tickerChart2-1">
                  <canvas id="myChart1-1" width="200" height="200"></canvas>
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-4">
                <div class="row" id="tickerChartHeader2-2"></div>
                <div class="row" id="periodButtons2-2"></div>
                <div class="row" id="tickerChart2-2">
                  <canvas id="myChart1-2" width="200" height="200"></canvas>
                </div>
              </div>
              <div class="col-sm-12 col-md-6 col-lg-4">
                <div class="row" id="tickerChartHeader2-3"></div>
                <div class="row" id="periodButtons2-3"></div>
                <div class="row" id="tickerChart2-3">
                  <canvas id="myChart1-3" width="200" height="200"></canvas>
                </div>
              </div>
            </div>



          </Row>
        </div>
      </Container>
    );
  }
}

export default Tickers;
