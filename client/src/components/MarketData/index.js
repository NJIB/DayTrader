import React from "react";

// This file exports the Input, NotesArea, and FormBtn components

export function MarketData(props) {

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

    console.log("url: " + marketSummary.url);

    const mktSummResponse = await fetch(marketSummary.url, marketSummary)

    const mktSummOutput = await mktSummResponse.json();
    console.log("mktSummOutput: ", mktSummOutput);

    const mktSummResults = mktSummOutput.marketSummaryResponse.result[1].regularMarketChange.fmt;
    console.log("DJI change today: " + mktSummResults);
  }

  return (
    <div className="market-data">
      <input className="market-data" {...props} />
    </div>
  );
}
