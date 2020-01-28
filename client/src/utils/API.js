import axios from "axios";

export default {
  // Gets all tickers
  getTickers: function () {
    return axios.get("/api/tickers");
  },
  // Gets the ticker with the given id
  getTicker: function (id) {
    return axios.get("/api/tickers/" + id);
  },
  // Deletes the ticker with the given id
  deleteTicker: function (id) {
    return axios.delete("/api/tickers/" + id);
  },
  // Saves a ticker to the database
  saveTicker: function (tickerData) {
    console.log("tickerData:" + tickerData);
    return axios.post("/api/tickers", tickerData);
  },
  // Gets all tickerSummary data from db
  getTickerSummary: function () {
    return axios.get("/api/tickerSummary");
  },
  // Add this record to the TickerSummary to the database
  saveTickerSummary: function (tickerSummary) {
    console.log("Save to TickerSummary");
    console.log("tickerSummary: ", tickerSummary);
    return axios.post("/api/tickersummary", tickerSummary);
  },
  // Add this record to the TickerSummary to the database
  updateTickerSummary: function (tickerData) {
    console.log("Update existing TickerSummary record");
    console.log("tickerData.id: ", tickerData.id);
    return axios.put("/api/tickersummary/" + tickerData.id, tickerData);
  }
};
