const router = require("express").Router();
const tickersController = require("../../controllers/tickersController");
const moment = require("moment");


// Matches with "/api/tickers"
router.route("/")
  .get(tickersController.findAll)
  // .get(tickersController.getTickerInfo)
  .post(tickersController.create);

// Matches with "/api/tickers/:id"
router
  .route("/:id")
  .get(tickersController.findById)
  .put(tickersController.update)
  .delete(tickersController.remove);



// //NJIB added to handle API call
const axios = require("axios");

var startDate = (moment().format("MM")) + "/"
+ (moment().format("DD")) + "/"
+ (moment().format("YYYY"));

// Convert to seconds
startDate = parseInt((moment(startDate) / 1000));
console.log("startDate: " + startDate);

// dateNowSeconds = parseInt((moment() / 1000));
let dateNowSeconds = parseInt((moment() / 1000));
console.log("dateNowSeconds: " + dateNowSeconds);

var priceResults = [];
var volResults = [];
var dayDate = [];

//Chart data API
// var settings = {
//   "async": true,
//   "crossDomain": true,
//   "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-historical-data?frequency=1d&filter=history&period1=" + startDate + "&period2=" + dateNowSeconds + "&symbol=" + { params: req.query },
//   "method": "GET",
//   "headers": {
//     "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
//     "x-rapidapi-key": process.env.apiKey
//   }
// }

// console.log("queryURL: " + settings.url);

// router.get("/stock", (req, res) => {
//   axios
//     .get({ settings })
//     .then(({ data: { results } }) => res.json(results))
//     .catch(err => res.status(422).json(err));
// });

module.exports = router;