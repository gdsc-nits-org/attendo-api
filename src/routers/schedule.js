const express = require("express");
const Controllers = require("../controllers");
const Middlewares = require("../middlewares");

const router = express.Router();

router.post(
  "/",
  Middlewares.IdChecker("classId", "body"),
  Controllers.Schedule.createSchedule
);
router.patch(
  "/",
  Middlewares.IdChecker("scheduleId", "body"),
  Middlewares.IdChecker("scheduleClassId", "body"),
  Controllers.Schedule.updateSchedule
);
router.delete(
  "/",
  Middlewares.IdChecker("scheduleId", "body"),
  Middlewares.IdChecker("scheduleClassId", "body"),
  Controllers.Schedule.deleteSchedule
);
router.get(
  "/:classId/:day",
  Middlewares.IdChecker("classId"),
  Controllers.Schedule.getSchedule
);

module.exports = router;
