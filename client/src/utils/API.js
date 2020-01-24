import axios from "axios";

export default {
  // Gets all tickers
  getTickers: function() {
    return axios.get("/api/tickers");
  },
  // Gets the ticker with the given id
  getTicker: function(id) {
    return axios.get("/api/tickers/" + id);
  },
  // Deletes the ticker with the given id
  deleteTicker: function(id) {
    return axios.delete("/api/tickers/" + id);
  },
  // Saves a ticker to the database
  saveTicker: function(tickerData) {
    console.log("tickerData:" + tickerData);
    return axios.post("/api/tickers", tickerData);
  },
    // Add this record to the TickerSummary to the database
    saveTickerSummary: function(tickerData) {
      console.log("Save to TickerSummary");
      return axios.post("/api/tickersummary", tickerData);
    } 
  
};
