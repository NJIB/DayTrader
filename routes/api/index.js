const router = require("express").Router();
const tickerRoutes = require("./tickers");

// ticker routes
router.use("/tickers", tickerRoutes);

module.exports = router;
