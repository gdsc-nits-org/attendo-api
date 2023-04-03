const express = require("express");
const Controllers = require("../controllers");
const Middlewares = require("../middlewares");

const router = express.Router();

router.get(
  "/all/:classId",
  Middlewares.IdChecker("classId"),
  Controllers.Notice.getAllNotices
);
router.get(
  "/:noticeId",
  Middlewares.IdChecker("noticeId"),
  Controllers.Notice.getAllNotices
);
router.post(
  "/:classId",
  Middlewares.IdChecker("classId"),
  Controllers.Notice.addNotice
);
router.put(
  "/:noticeId",
  Middlewares.IdChecker("noticeId"),
  Controllers.Notice.editNotice
);
router.delete(
  "/:noticeId/:classId",
  Middlewares.IdChecker("noticeId"),
  Middlewares.IdChecker("classId"),
  Controllers.Notice.deleteNotice
);

module.exports = router;
