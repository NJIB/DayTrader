const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tickerSummarySchema = new Schema({
  // ticker: { type: String },
  // quantity: { type: String },
  ticker: { type: String, required: true },
  quantity: { type: String, required: true },
  cost: {type: String, default: 1},
  averageprice:  {type: String, default: 1},
  date: { type: Date, default: Date.now },
  // user: { type: String, required: true, default: null },
});

const TickerSummary = mongoose.model("TickerSummary", tickerSummarySchema);

module.exports = TickerSummary;