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
    return axios.post("/api/tickers", tickerData);
  }
  ,
  //NJIB added - to be spliced in
    getTickerInfo: function(query) {
      // return axios.get("/api/tickers", { params: { q: query } });
      return axios.get("/api/tickers");
  } 
};
