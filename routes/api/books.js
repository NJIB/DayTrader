const router = require("express").Router();
const tickersController = require("../../controllers/tickersController");

// Matches with "/api/books"
router.route("/")
  .get(tickersController.findAll)
  .post(tickersController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(tickersController.findById)
  .put(tickersController.update)
  .delete(tickersController.remove);

module.exports = router;
