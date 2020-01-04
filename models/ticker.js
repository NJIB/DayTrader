const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tickerSchema = new Schema({
  ticker: { type: String, required: true },
  quantity: { type: String, required: true },
  transactionprice: {type: String, default: 1},
  transactiondate: {type: Date, default: null},
  notes: {type: String, default: null },
  date: { type: Date, default: Date.now }
});

const Ticker = mongoose.model("Ticker", tickerSchema);

module.exports = Ticker;
