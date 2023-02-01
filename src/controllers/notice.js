const Models = require("../models");
const Utils = require("../utils");

async function getAllNotices(req, res) {
  const { classId } = req.params;

  const notices = await Models.Notice.find({ class: classId });
  return res.json(Utils.Response.success(notices));
}

async function getNotice(req, res) {
  const { noticeId } = req.params;

  const notice = await Models.Notice.findById(noticeId);
  return res.json(Utils.Response.success(notice));
}

async function addNotice(req, res, next) {
  const { classId } = req.params;
  const { title, body } = req.body;

  if (
    !title ||
    typeof title !== "string" ||
    !body ||
    typeof body !== "string"
  ) {
    return next(Utils.Response.error("Type Error", 400));
  }

  const newNotice = await Models.Notice.create({
    title: title,
    body: body,
    class: classId,
  });
  const students = await Models.User.find({
    class: classId,
    isCr: false,
  });

  Utils.Notification.sendNotificationToStudents(
    students,
    "You have a new notice"
  );

  return res.json(Utils.Response.success(newNotice));
}

async function editNotice(req, res) {
  const { noticeId } = req.params;

  const notice = await Models.Notice.findById(noticeId);

  const cls = notice.class;
  const students = await Models.User.find({
    class: cls,
    isCr: false,
  });

  //! A bad move to give req.body directly
  const updatedNotice = await Models.Notice.findByIdAndUpdate(
    noticeId,
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );

  Utils.Notification.sendNotificationToStudents(
    students,
    "CR has updated a notice"
  );

  return res.json(Utils.Response.success(updatedNotice));
}

async function deleteNotice(req, res) {
  const { noticeId, classId } = req.params;

  await Models.Notice.findByIdAndDelete(noticeId);
  const notices = await Models.Notice.find({ class: classId });
  return res.json(Utils.Response.success(notices));
}

module.exports = {
  getAllNotices,
  getNotice,
  addNotice,
  editNotice,
  deleteNotice,
};
