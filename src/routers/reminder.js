const express = require("express");
const Controllers = require("../controllers");

const router = express.Router();

router.post("/", Controllers.Reminder.setReminder);

module.exports = router;
