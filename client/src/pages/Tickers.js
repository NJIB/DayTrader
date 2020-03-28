import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import { defaults } from 'react-chartjs-2';
import { Bar, Line } from 'react-chartjs-2';
// import { Bar, Line, Pie, Mixedchart } from 'react-chartjs-2';
// import PeriodBtns from "../components/PeriodBtns";
import { Btn1d, Btn5d, Btn10d, Btn1m, Btn3m, Btn1y, Btn5y, Btn3y, Btn10y } from "../components/PeriodBtns";
import DeleteChartBtn from "../components/DeleteChartBtn";
import "./styles/style.css";

const moment = require("moment");

let chartsLog = ["1-1", "1-2", "1-3", "2-1", "2-2", "2-3"];
let chartsCounter = 0;
let recordsCounter = 0;
let startSeconds = 0;

const seconds1d = 86400;
const seconds5d = 432000;
const seconds10d = 864000;
const seconds1m = 2629800;
const seconds3m = 7889400;
const seconds1y = 31557600;
const seconds3y = 94672800;
const seconds5y = 157788000;
const seconds10y = 315576000;

class Tickers extends Component {
  state = {
    tickers: [],
    tickerSearch: "",
    chartData: [],
    newChartData: [],
    exchangeData: [],
  };

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "bottom",
    maintainAspectRatio: true
  }

  componentDidMount() {
    this.getMarketData();
  }

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

  handlePeriodBtnClick = async periodRef => {
    const { name, value } = periodRef.target.id;
    this.setState({
      [name]: value
    });
    console.log("periodRef.target.id: ", periodRef.target.id);
    console.log("periodRef.target: ", periodRef.target);
    console.log("this: ", this);

    this.getTickerData(periodRef.target.value, periodRef.target.id);
  }

  handleDeleteBtnClick = async chartRef => {
    const { name, value } = chartRef.target.id;
    this.setState({
      [name]: value
    });

    console.log("DELETE BUTTON CLICKED!")
    const chartToDelete = chartRef.target.id;
    console.log("chartRef.target.id: ", chartRef.target.id);
    console.log("chartToDelete: ", chartToDelete);
    console.log("this.state: ", this.state);

    // Loop through to find the matching ChartRef, then delete and reload page
    for (var i = 0; i < this.state.chartData.length; i++) {
      if (this.state.chartData[i].chartDivRefData.chartDivRef === chartToDelete) {
        for (var j = i; j < this.state.chartData.length - 1; j++) {
          this.state.chartData[j] = this.state.chartData[(j + 1)];
        }
        console.log(chartToDelete, " deleted");
        this.state.chartData.length = (this.state.chartData.length - 1);
      }
    }
    this.setState({ chartData: this.state.chartData });
    console.log("this.state: ", this.state);
    //
  }

  handleFormSubmit = async event => {
    event.preventDefault();
    const { chartData } = this.state;
    //Check validation on the following line (may need to be different from ticker example)
    if (this.state.tickerSearch) {
      // let tickerData = this.state.tickerSearch;

      const seconds1y = 31557600;
      this.getTickerData('1y');

      // let tickerData = this.state.tickerSearch;

      //   let dateNow = (moment().format("MM")) + "/"
      //     + (moment().format("DD")) + "/"
      //     + (moment().format("YYYY"));
      //   console.log("dateNow: " + dateNow);

      //   let dateNowSeconds = parseInt((moment() / 1000));
      //   console.log("dateNowSeconds: " + dateNowSeconds);

      //   const seconds1d = 86400;
      //   const seconds5d = 432000;
      //   const seconds1m = 2629800;
      //   const seconds3m = 7889400;
      //   const seconds1y = 31557600;
      //   const seconds3y = 94672800;
      //   const seconds5y = 157788000;
      //   const seconds10y = 315576000;

      //   let startDateSeconds = (dateNowSeconds - seconds1y);
      //   console.log("startDateSeconds: " + startDateSeconds);

      //   // console.log("startDate: "
      //   //   + (moment(startDateSeconds).format("MM")) + "/"
      //   //   + (moment().format("DD")) + "/"
      //   //   + (moment().format("YYYY")));

      //   console.log("****tickerData: ", tickerData, " ****");
      //   let settings = {
      //     "async": true,
      //     "crossDomain": true,
      //     "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-historical-data?frequency=1d&filter=history&period1=" + startDateSeconds + "&period2=" + dateNowSeconds + "&symbol=" + tickerData,
      //     "method": "GET",
      //     "headers": {
      //       "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
      //       "x-rapidapi-key": "7eb729d91fmshd56769216684858p17fff1jsna4991481e499"
      //       // "x-rapidapi-key": process.env.apiKey
      //     }
      //   }

      //   console.log("queryURL: " + settings.url);
      //   const chartResponse = await fetch(settings.url, settings)
      //   const responseData = await chartResponse.json();
      //   console.log("responseData: ", responseData);

      //   // Populating the different chart areas

      //   chartsCounter++;
      //   console.log("chartsCounter: " + chartsCounter);
      //   let chartDivRef = ("ChartDivRef" + chartsLog[chartsCounter - 1]);
      //   let priceResults = [];
      //   let volResults = [];
      //   let dayDate = [];
      //   let latestPrice = "";
      //   let priorDayPrice = "";
      //   let latestPriceDate = "";
      //   let latestPriceChangeNum = "";
      //   let latestPriceChangePct = "";

      //   for (var i = (responseData.prices.length - 1); i > 0; i--) {
      //     priceResults.push(responseData.prices[i].close);
      //     volResults.push(responseData.prices[i].volume / 1000000);
      //     dayDate.push(moment((responseData.prices[i].date) * 1000).format("MMM Do YY"));
      //     // console.log("responseData.prices[i].date: ", moment((responseData.prices[i].date) * 1000).format("MMM Do YYYY"));
      //     recordsCounter++;
      //     // console.log("recordsCounter: ", recordsCounter);
      //     // console.log("responseData.prices.length: ", responseData.prices.length);

      //     if (recordsCounter === (responseData.prices.length - 2)) {
      //       priorDayPrice = (responseData.prices[i].close).toFixed(2);
      //     };

      //     if (recordsCounter === (responseData.prices.length - 1)) {
      //       latestPrice = (responseData.prices[i].close).toFixed(2);
      //       latestPriceDate = (moment((responseData.prices[i].date) * 1000).format("MMM Do YYYY"));
      //       latestPriceChangeNum = (latestPrice - priorDayPrice).toFixed(2);
      //       latestPriceChangePct = (latestPrice / priorDayPrice).toFixed(2);
      //       recordsCounter = 0;
      //     };

      //   }

      //   // console.log("priceResults: " + priceResults);
      //   // console.log("volResults: " + volResults);
      //   // console.log("dayDate: " + dayDate);

      //   console.log("chartDivRef: " + chartDivRef);

      //   const localChartData = {
      //     chartDivRefData: {
      //       chartDivRef: chartDivRef,
      //       tickerSearch: tickerData,
      //       latestPrice: latestPrice,
      //       latestPriceDate: latestPriceDate,
      //       latestPriceChangeNum: latestPriceChangeNum,
      //       latestPriceChangePct: latestPriceChangePct
      //     },
      //     labels:
      //       dayDate,
      //     datasets: [
      //       {
      //         label: "Stock Price",
      //         type: 'line',
      //         // yAxisID: "A",
      //         yAxesGroup: "A",
      //         data: priceResults,
      //         backgroundColor: 'grey',
      //         pointRadius: '1px',
      //         y1axis: true
      //       },
      //       {
      //         label: "Volume",
      //         // yAxisID: "B",
      //         yAxesGroup: "B",
      //         data: volResults,
      //         backgroundColor: 'white',
      //         // y2axis: true
      //       }
      //     ],
      //     options: {
      //       scales: {
      //         yAxes: [
      //           {
      //             id: 'A',
      //             type: 'linear',
      //             position: 'left',
      //           },
      //           {
      //             id: 'B',
      //             type: 'linear',
      //             position: 'right',
      //             ticks: {
      //             // min: 0,
      //             // max: 1
      //             },
      //           }
      //         ]
      //       },
      //       legendPosition: "bottom"
      //     }
      //   }

      //   chartData.push(localChartData);

      //   this.setState({ chartData });
      //   this.setState({ tickerSearch: "" })
      //   console.log("this.state: ", this.state)
    };
  };

  getTickerData = async (period, chartRef) => {

    let tickerData;

    console.log("*******************************************************************************************");
    console.log("period: ", period);
    console.log("chartRef: ", chartRef);
    console.log("this.state.chartData: ", this.state.chartData);
    console.log("this.state: ", this.state);

    const { chartData } = this.state;

    if (!chartRef) {
      tickerData = this.state.tickerSearch;
      console.log("!@!@!@! tickerData: ", tickerData, "!@!@!@!");
    } else {
      for (let i = 0; i < this.state.chartData.length; i++) {
        console.log("this.state.chartData[i].chartDivRefData.chartDivRef: ", this.state.chartData[i].chartDivRefData.chartDivRef);
        if (chartRef === this.state.chartData[i].chartDivRefData.chartDivRef) {
          tickerData = this.state.chartData[i].chartDivRefData.tickerSearch;
          console.log("!@!@!@! tickerData: ", tickerData, "!@!@!@!");
        }
      }
    }

    let dateNow = (moment().format("MM")) + "/"
      + (moment().format("DD")) + "/"
      + (moment().format("YYYY"));
    console.log("dateNow: " + dateNow);

    let dateNowSeconds = parseInt((moment() / 1000));
    console.log("dateNowSeconds: " + dateNowSeconds);
    console.log("period: ", period);

    switch (period) {
      case '1d':
        startSeconds = seconds1d;
        break;
      case '5d':
        startSeconds = seconds5d;
        break;
      case '10d':
        startSeconds = seconds10d;
        break;
      case '1m':
        startSeconds = seconds1m;
        break;
      case '3m':
        startSeconds = seconds3m;
        break;
      case '1y':
        startSeconds = seconds1y;
        break;
      case '3y':
        startSeconds = seconds3y;
        break;
      case '5y':
        startSeconds = seconds5y;
        break;
      case '10y':
        startSeconds = seconds10y;
        break;
    }
    console.log("startSeconds: ", startSeconds)

    // let startDateSeconds = (dateNowSeconds - seconds1y);
    // let startDateSeconds = (dateNowSeconds - period);
    let startDateSeconds = (dateNowSeconds - startSeconds);
    console.log("startDateSeconds: " + startDateSeconds);

    // console.log("startDate: "
    //   + (moment(startDateSeconds).format("MM")) + "/"
    //   + (moment().format("DD")) + "/"
    //   + (moment().format("YYYY")));

    console.log("****tickerData in getTickerData: ", tickerData, " ****");
    let settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-historical-data?frequency=1d&filter=history&period1=" + startDateSeconds + "&period2=" + dateNowSeconds + "&symbol=" + tickerData,
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

    chartsCounter++;
    console.log("chartsCounter: " + chartsCounter);
    // let chartDivRef = ("ChartDivRef" + chartsLog[chartsCounter - 1]);
    let chartDivRef = "";
    let priceResults = [];
    let volResults = [];
    let dayDate = [];
    let latestPrice = "";
    let priorDayPrice = "";
    let latestPriceDate = "";
    let latestPriceChangeNum = "";
    let latestPriceChangePct = "";

    if (!chartRef) {
      chartDivRef = ("ChartDivRef" + chartsLog[chartsCounter - 1]);
    } else {
      chartDivRef = chartRef;
    }

    for (var i = (responseData.prices.length - 1); i > 0; i--) {
      priceResults.push(responseData.prices[i].close);
      volResults.push(responseData.prices[i].volume / 1000000);
      dayDate.push(moment((responseData.prices[i].date) * 1000).format("MMM Do YY"));
      // console.log("responseData.prices[i].date: ", moment((responseData.prices[i].date) * 1000).format("MMM Do YYYY"));
      recordsCounter++;
      // console.log("recordsCounter: ", recordsCounter);
      // console.log("responseData.prices.length: ", responseData.prices.length);

      if (recordsCounter === (responseData.prices.length - 2)) {
        priorDayPrice = (responseData.prices[i].close).toFixed(2);
      };

      if (recordsCounter === (responseData.prices.length - 1)) {
        latestPrice = (responseData.prices[i].close).toFixed(2);
        latestPriceDate = (moment((responseData.prices[i].date) * 1000).format("MMM Do YYYY"));
        latestPriceChangeNum = (latestPrice - priorDayPrice).toFixed(2);
        latestPriceChangePct = (latestPrice / priorDayPrice).toFixed(2);
        recordsCounter = 0;
      };

    }

    // console.log("priceResults: " + priceResults);
    // console.log("volResults: " + volResults);
    // console.log("dayDate: " + dayDate);

    console.log("chartDivRef: " + chartDivRef);

    const localChartData = {
      chartDivRefData: {
        chartDivRef: chartDivRef,
        tickerSearch: tickerData,
        latestPrice: latestPrice,
        latestPriceDate: latestPriceDate,
        latestPriceChangeNum: latestPriceChangeNum,
        latestPriceChangePct: latestPriceChangePct
      },
      labels:
        dayDate,
      datasets: [
        {
          label: "Stock Price",
          type: 'line',
          // yAxisID: "A",
          yAxesGroup: "A",
          data: priceResults,
          backgroundColor: 'grey',
          pointRadius: '1px',
          y1axis: true
        },
        {
          label: "Volume",
          type: 'bar',
          // yAxisID: "B",
          yAxesGroup: "B",
          data: volResults,
          backgroundColor: 'white',
          // y2axis: true
        }
      ],
      options: {
        scales: {
          yAxes: [
            {
              id: 'A',
              type: 'linear',
              position: 'left',
            },
            {
              id: 'B',
              type: 'linear',
              position: 'right',
              ticks: {
                // min: 0,
                // max: 1
              },
            }
          ]
        },
        legendPosition: "bottom"
      }
    }

    let tickers = [];
    let chartPush = true;

    console.log("chartData.length: ", chartData.length);
    if (chartData.length > 0) {

      // Log number of charts, to avoid duplicating charts
      const chartCount = chartData.length;
      console.log("chartCount: ", chartCount);

      for (var j = 0; j < chartCount; j++) {
        tickers.push(chartData[j].chartDivRefData.tickerSearch);
        console.log("tickers: ", tickers);

        if (chartDivRef === chartData[j].chartDivRefData.chartDivRef) {
          console.log(chartDivRef, " found")
          chartData[j] = localChartData;
          chartPush = false;
          console.log("chartData updated: ", chartData);
          // chartData.length = chartCount;
          console.log("chartData: ", chartData);
        }
        else 
        if (chartPush == true)
        {
          // else if (chartDivRef !== chartData[j].chartDivRefData.chartDivRef && (!tickers.indexOf(tickerData))) {
          chartData.push(localChartData);
        }
      }
    }
    else {
      console.log("NO CHARTDATA FOUND!")
      chartData.push(localChartData);
    }


    this.setState({ chartData });
    this.setState({ tickerSearch: "" })
    console.log("this.state: ", this.state)
  };

  getMarketData = async event => {

    //Market summary data API
    var marketSummary = {
      "async": true,
      "crossDomain": true,
      "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-summary?region=US&lang=en",
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "x-rapidapi-key": "7eb729d91fmshd56769216684858p17fff1jsna4991481e499"
      }
    }

    // console.log("url: " + marketSummary.url);
    const mktSummResponse = await fetch(marketSummary.url, marketSummary)
    const mktSummOutput = await mktSummResponse.json();
    // console.log("mktSummOutput: ", mktSummOutput);

    const { exchangeData } = this.state;
    let exchangeCounter = 0;

    mktSummOutput.marketSummaryResponse.result.forEach(exchange => {
      const localExchangeData = {
        exchange: exchange.fullExchangeName.split(" ", 1),
        currentPrice: exchange.regularMarketPrice.fmt,
        priceChange: exchange.regularMarketChange.fmt,
        priceChangePercent: exchange.regularMarketChangePercent.fmt
      }
      // console.log("localExchangeData: ", localExchangeData);
      exchangeCounter++;
      if (exchangeCounter <= 3) {
        exchangeData.push(localExchangeData);
      } else {
        return;
      }
    });

    this.setState({ exchangeData });
    // console.log("this.state: ", this.state);

  }

  render() {
    return (
      <Container fluid className='SearchPane'>
        <div id="tickerSearch" className="card card-default">
          <Row>
            <Col size="md-6">
              <h4>Which Stock Tickers Do You Want To Track?</h4>
              <form>
                <Row>
                  <Col size="lg-8 md-8">
                    <Input
                      value={this.state.tickerSearch}
                      onChange={this.handleInputChange}
                      name="tickerSearch"
                      placeholder="Stock Ticker"
                    />
                  </Col>
                  <Col size="lg-2 md-2">
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
            <Col size="md-6">
              <div id="marketInfo" className="card card-default">
                {/* <h4>Today's markets as of  {this.state.dateStamp}</h4> */}
                <h4>Today's markets:</h4>

                <thead>
                  <tr>
                    <th scope={'col'} style={{ width: '40%', textAlign: 'left' }}>Exchange</th>
                    <th scope={'col'} style={{ width: '23%', textAlign: 'center' }}>Price</th>
                    <th scope={'col'} style={{ width: '21%', textAlign: 'center' }}>Change</th>
                    <th scope={'col'} style={{ width: '16%', textAlign: 'center' }}>% Chg.</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.exchangeData.length ?
                    this.state.exchangeData.map(exch => (
                      <tr>
                        <td style={{ width: '40%', textAlign: 'left' }}>
                          <strong>
                            {exch.exchange}
                          </strong>
                        </td>
                        <td style={{ width: '20%', textAlign: 'center' }}>
                          {exch.currentPrice}
                        </td>
                        <td style={{ width: '20%', textAlign: 'center' }}>
                          {exch.priceChange}
                        </td>
                        <td style={{ width: '20%', textAlign: 'center' }}>
                          {exch.priceChangePercent}
                        </td>
                      </tr>
                    ))
                    : (
                      <h4>No Results to Display</h4>
                    )}

                </tbody>
              </div>
            </Col>
          </Row>
        </div>

        <div id="chartPane" className="card card-default">
          <Row>
            {this.state.chartData.length ? (
              this.state.chartData.map(chartRender => (
                <div id="tickerOutput" className="card card-default">
                  <Row>
                    <Col size="md-4">
                      <b>
                        <span>{chartRender.chartDivRefData.tickerSearch}</span>
                      </b>
                    </Col>
                    <Col size="md-8">
                      <p id='asOfDate'> ( as of {chartRender.chartDivRefData.latestPriceDate} )</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col size="md-4">
                      <span>Price: ${chartRender.chartDivRefData.latestPrice}</span>
                    </Col>
                    <Col size="md-4">
                      {chartRender.chartDivRefData.latestPriceChangeNum > 0 ?
                        <span>Change: +${chartRender.chartDivRefData.latestPriceChangeNum}</span>
                        :
                        <span>Change: -${chartRender.chartDivRefData.latestPriceChangeNum}</span>
                      }
                    </Col>
                    <Col size="md-4">
                      {chartRender.chartDivRefData.latestPriceChangePct > 0 ?
                        <span>Change: +{chartRender.chartDivRefData.latestPriceChangePct}%</span>
                        :
                        <span>Change: -{chartRender.chartDivRefData.latestPriceChangePct}%</span>
                      }
                    </Col>
                  </Row>
                  <Row>
                    <svg style={{
                      height: "0.25",
                      // width:"400",
                      width: "100%",
                      backgroundColor: "darkgrey",
                      margin: "10px"
                    }}>
                    </svg>
                  </Row>
                  <div className="chart">
                    <Bar className="Bar"
                      data={chartRender}
                      width={420}
                      height={250}
                    />
                    <Btn1d
                      name={"Btn1d"}
                      id={chartRender.chartDivRefData.chartDivRef}
                      value={"1d"}
                      onClick={this.handlePeriodBtnClick}
                    />
                    <Btn5d
                      name={"Btn5d"}
                      id={chartRender.chartDivRefData.chartDivRef}
                      value={"5d"}
                      onClick={this.handlePeriodBtnClick}
                    />
                    <Btn10d
                      name={"Btn10d"}
                      id={chartRender.chartDivRefData.chartDivRef}
                      value={"10d"}
                      onClick={this.handlePeriodBtnClick}
                    />
                    <Btn1m
                      name={"Btn1m"}
                      id={chartRender.chartDivRefData.chartDivRef}
                      value={"1m"}
                      onClick={this.handlePeriodBtnClick}
                    />
                    <Btn3m
                      name={"Btn3m"}
                      id={chartRender.chartDivRefData.chartDivRef}
                      value={"3m"}
                      onClick={this.handlePeriodBtnClick}
                    />
                    <Btn1y
                      name={"Btn1y"}
                      id={chartRender.chartDivRefData.chartDivRef}
                      value={"1y"}
                      onClick={this.handlePeriodBtnClick}
                    />
                    <Btn3y
                      name={"Btn3y"}
                      id={chartRender.chartDivRefData.chartDivRef}
                      value={"3y"}
                      onClick={this.handlePeriodBtnClick}
                    />
                    <Btn5y
                      name={"Btn5y"}
                      id={chartRender.chartDivRefData.chartDivRef}
                      value={"5y"}
                      onClick={this.handlePeriodBtnClick}
                    />
                    <Btn10y
                      name={"Btn10y"}
                      id={chartRender.chartDivRefData.chartDivRef}
                      value={"10y"}
                      onClick={this.handlePeriodBtnClick}
                    />
                    <DeleteChartBtn
                      id={chartRender.chartDivRefData.chartDivRef}
                      value={this.state.deleteBtnId}
                      onClick={this.handleDeleteBtnClick}
                      name="deleteBtnId"
                    />
                  </div>
                </div>
              ))) :
              (<span>Stock charts will be displayed here</span>)}
          </Row>
        </div>
      </Container>
    );
  }
}

export default Tickers;
