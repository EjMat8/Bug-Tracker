const express = require("express");

const ticketController = require("../controllers/ticketController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(
  authController.protectRoute,
  authController.restrictTo("admin", "developer")
);

router
  .route("/")
  .post(ticketController.createTicket)
  .get(ticketController.getAllTicket);

router
  .route("/:id")
  .get(ticketController.getTicket)
  .patch(ticketController.updateTicket)
  .delete(ticketController.deleteTicket);

module.exports = router;
