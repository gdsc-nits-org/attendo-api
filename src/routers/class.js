const express = require("express");
const Controllers = require("../controllers");
const Middlewares = require("../middlewares");

const router = express.Router();

router.post("/", Controllers.Class.createClass);
router.post("/join", Controllers.Class.joinClass);
router.get(
  "/:classId",
  Middlewares.IdChecker("classId"),
  Controllers.Class.getClassInfo
);
router.get("/leave/:email", Controllers.Class.leaveClass);

module.exports = router;
