const express = require("express");
const Controllers = require("../controllers");
const Middlewares = require("../middlewares");

const router = express.Router();

router.get(
  "/all/:classId",
  Middlewares.Checker.idChecker("classId"),
  Controllers.Notice.getAllNotices
);
router.get(
  "/:noticeId",
  Middlewares.Checker.idChecker("noticeId"),
  Controllers.Notice.getAllNotices
);
router.post(
  "/:classId",
  Middlewares.Checker.idChecker("classId"),
  Controllers.Notice.addNotice
);
router.put(
  "/:noticeId",
  Middlewares.Checker.idChecker("noticeId"),
  Controllers.Notice.editNotice
);
router.delete(
  "/:noticeId/:classId",
  Middlewares.Checker.idChecker("noticeId"),
  Middlewares.Checker.idChecker("classId"),
  Controllers.Notice.deleteNotice
);

module.exports = router;
