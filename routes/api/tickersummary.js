const router = require("express").Router();
const tickerSummaryController = require("../../controllers/tickerSummaryController");

// Matches with "/api/tickersummary"
router.route("/")
  .get(tickerSummaryController.findAll)
  .post(tickerSummaryController.create);

// Matches with "/api/tickers/:id"
router.route("/:id")
  .get(tickerSummaryController.findById)
  .put(tickerSummaryController.update)
  .delete(tickerSummaryController.remove);

module.exports = router;