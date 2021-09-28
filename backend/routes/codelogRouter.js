const express = require("express");
const codelogController = require("../controllers/codelogController");
const router = express.Router();
router
  .route("/")
  .get(codelogController.getCodelogs)
  .post(codelogController.createCodelog);

router
  .route("/:id")
  .get(codelogController.getCodelog)
  .patch(codelogController.updateCodelog)
  .delete(codelogController.deleteCodelog);
module.exports = router;
