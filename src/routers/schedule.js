const express = require("express");
const Controllers = require("../controllers");

const router = express.Router();

router.post("/", Controllers.Schedule.createSchedule);
router.patch("/", Controllers.Schedule.updateSchedule);
router.delete("/", Controllers.Schedule.deleteSchedule);
router.get("/:classId/:day", Controllers.Schedule.getSchedule);

module.exports = router;
