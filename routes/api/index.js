const router = require("express").Router();
const tickerRoutes = require("./tickers");
const tickerSummaryRoutes = require("./tickersummary");

// ticker routes
router.use("/tickers", tickerRoutes);
router.use("/tickersummary", tickerSummaryRoutes);

module.exports = router;
