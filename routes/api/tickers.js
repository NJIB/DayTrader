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

module.exports = router;