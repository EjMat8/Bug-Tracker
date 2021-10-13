const express = require("express");
const projectController = require("../controllers/projectController");
const authController = require("../controllers/authController");
const ticketRoutes = require("../routes/ticketRoutes");
const router = express.Router();

router.use("/:projectid/tickets", ticketRoutes);
router.use(authController.protectRoute);
router
  .route("/")
  .get(projectController.getAllProject)
  .post(
    authController.restrictTo("admin", "project manager"),
    projectController.createProject
  );

router
  .route("/:id")
  .get(projectController.getOneProject)
  .patch(
    authController.restrictTo("admin", "project manager"),
    projectController.updateProject
  )
  .delete(
    authController.restrictTo("admin", "project manager"),
    projectController.deleteProject
  );

router
  .route("/:id/addUser")
  .patch(
    authController.restrictTo("admin", "project manager"),
    projectController.updateUsersInProject()
  );

router
  .route("/:id/deleteUser")
  .delete(
    authController.restrictTo("admin", "project manager"),
    projectController.updateUsersInProject(true)
  );
module.exports = router;
