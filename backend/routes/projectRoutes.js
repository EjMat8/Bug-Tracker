const express = require("express");
const projectController = require("../controllers/projectController");
const authController = require("../controllers/authController");
const router = express.Router();

router.use(authController.protectRoute);
router
  .route("/")
  .get(projectController.getAll)
  .post(
    authController.restrictTo("admin", "project manager"),
    projectController.create
  );

module.exports = router;
