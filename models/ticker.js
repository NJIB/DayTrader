const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tickerSchema = new Schema({
  ticker: { type: String, required: true },
  quantity: { type: String, required: true },
  notes: String,
  date: { type: Date, default: Date.now }
});

const Ticker = mongoose.model("Ticker", tickerSchema);

module.exports = Ticker;
