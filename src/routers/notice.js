const express = require("express");
const Controllers = require("../controllers");

const router = express.Router();

router.get("/all/:classId", Controllers.Notice.getAllNotices);
router.get("/:noticeId", Controllers.Notice.getAllNotices);
router.post("/:classId", Controllers.Notice.addNotice);
router.put("/:noticeId", Controllers.Notice.editNotice);
router.delete("/:noticeId/:classId", Controllers.Notice.deleteNotice);

module.exports = router;
