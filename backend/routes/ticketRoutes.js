const express = require("express");

const ticketController = require("../controllers/ticketController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(authController.protectRoute());

router.route("/stats").get(ticketController.getStats);

router
  .route("/")
  .post(
    authController.restrictTo("admin", "developer"),
    ticketController.createTicket
  )
  .get(ticketController.getAllTicket);

router
  .route("/:id")
  .get(ticketController.getTicket)
  .patch(
    authController.restrictTo("admin", "developer"),
    ticketController.updateTicket
  )
  .delete(
    authController.restrictTo("admin", "developer"),
    ticketController.deleteTicket
  );

module.exports = router;
