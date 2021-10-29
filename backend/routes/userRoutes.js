const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const router = express.Router();

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router
  .route("/stayLoggedIn")
  .get(authController.protectRoute(true), authController.stayLoggedIn);
router.route("/logout").get(authController.logout);
router.route("/forgotPassword").post(authController.forgotPassword);
router.route("/resetPassword/:token").patch(authController.resetPassword);

router.use(authController.protectRoute());
router.route("/updatePassword").patch(authController.updatePassword);
router.use(authController.restrictTo("admin", "project manager"));
router.route("/").get(userController.getAllUser);
router.route("/:id").get(userController.getUser);

router
  .route("/updateUserRole/:id")
  .patch(authController.restrictTo("admin"), userController.updateUserRole);

module.exports = router;
