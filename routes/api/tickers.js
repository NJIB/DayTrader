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

module.exports = router;