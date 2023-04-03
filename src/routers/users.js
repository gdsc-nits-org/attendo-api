const express = require("express");
const Controllers = require("../controllers");
const Middlewares = require("../middlewares");

const router = express.Router();

router.get(
  "/students/:classId",
  Middlewares.IdChecker("classId"),
  Controllers.User.getAllUsersFromClass
);
router.put("/info/:email", Controllers.User.updateInfo);
router.get("/fcmtoken/:email", Controllers.User.getFcmToken);
router.put("/fcmtoken/update", Controllers.User.fcmUpdate);

module.exports = router;
