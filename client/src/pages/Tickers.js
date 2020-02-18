import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import { defaults } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
// import { Bar, Line, Pie, Mixedchart } from 'react-chartjs-2';
// import PeriodBtns from "../components/PeriodBtns";
import { Btn1d } from "../components/PeriodBtns";
import DeleteChartBtn from "../components/DeleteChartBtn";
import "./styles/style.css";

const moment = require("moment");

let chartsLog = ["1-1", "1-2", "1-3", "2-1", "2-2", "2-3"];
let chartsCounter = 0;
let recordsCounter = 0;

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

  handlePeriodBtnClick = async _ => {
    console.log("this: ", this);
    console.log("chartRef: ", this.state.chartData["0"].chartDivRefData.chartDivRef);
    const { chartPeriod } = this.state;
    console.log("chartPeriod: ", chartPeriod);
  }

  handleDeleteBtnClick = async chartRef => {
    const { name, value } = chartRef.target.id;
    this.setState({
      [name]: value
    });

    console.log("DELETE BUTTON CLICKED!")
    console.log("chartRef.target.id: ", chartRef.target.id);
  }

  handleFormSubmit = async event => {
    event.preventDefault();
    const { chartData } = this.state;
    //Check validation on the following line (may need to be different from ticker example)
    if (this.state.tickerSearch) {
      // let tickerData = this.state.tickerSearch;

    // NJIB test 02/17/2020  
    const seconds1y = 31557600;

    this.getTickerData(seconds1y, );
    // NJIB End test 02/17/2020

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

  // NJIB Test 02/17/2020
  getTickerData = async (period, chartRef) => {

    const { chartData } = this.state;

    let tickerData = this.state.tickerSearch;

    let dateNow = (moment().format("MM")) + "/"
    + (moment().format("DD")) + "/"
    + (moment().format("YYYY"));
  console.log("dateNow: " + dateNow);

  let dateNowSeconds = parseInt((moment() / 1000));
  console.log("dateNowSeconds: " + dateNowSeconds);

  // const seconds1d = 86400;
  // const seconds5d = 432000;
  // const seconds1m = 2629800;
  // const seconds3m = 7889400;
  // const seconds1y = 31557600;
  // const seconds3y = 94672800;
  // const seconds5y = 157788000;
  // const seconds10y = 315576000;

  // let startDateSeconds = (dateNowSeconds - seconds1y);
  let startDateSeconds = (dateNowSeconds - period);
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

    // NJIB Test 02/17/2020
  if (!chartRef) {
    chartDivRef = ("ChartDivRef" + chartsLog[chartsCounter - 1]);
} else {
  chartDivRef = chartRef;
}
    // NJIB End Test

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

  chartData.push(localChartData);

  this.setState({ chartData });
  this.setState({ tickerSearch: "" })
  console.log("this.state: ", this.state)
};
  //NJIB End test 02/17/2020

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
                    {/* <Btn1d
                      onClick={this.handlePeriodBtnClick("1d")}
                    /> */}
                    {/* <PeriodBtns /> */}
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
