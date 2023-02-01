const express = require("express");
const Controllers = require("../controllers");
const Middlewares = require("../middlewares");

const router = express.Router();

router.post(
  "/",
  Middlewares.Checker.idChecker("classId", "body"),
  Controllers.Schedule.createSchedule
);
router.patch(
  "/",
  Middlewares.Checker.idChecker("scheduleId", "body"),
  Middlewares.Checker.idChecker("scheduleClassId", "body"),
  Controllers.Schedule.updateSchedule
);
router.delete(
  "/",
  Middlewares.Checker.idChecker("scheduleId", "body"),
  Middlewares.Checker.idChecker("scheduleClassId", "body"),
  Controllers.Schedule.deleteSchedule
);
router.get(
  "/:classId/:day",
  Middlewares.Checker.idChecker("classId"),
  Controllers.Schedule.getSchedule
);

module.exports = router;
