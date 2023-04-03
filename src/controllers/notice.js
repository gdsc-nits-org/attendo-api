const Models = require("../models");
const Utils = require("../utils");
const Middlewares = require("../middlewares");

const getAllNotices = Middlewares.CatchAsync(async (req, res, next) => {
  const { classId } = req.params;

  const notices = await Models.Notice.find({ class: classId });
  if (notices.length === 0) {
    return next(Utils.Response.error("No notices found in the class !", 400));
  }

  return res.json(Utils.Response.success(notices));
});

const getNotice = Middlewares.CatchAsync(async (req, res, next) => {
  const { noticeId } = req.params;

  const notice = await Models.Notice.findById(noticeId);
  if (!notice) {
    return next(Utils.Response.error("No notice found with the id !", 400));
  }

  return res.json(Utils.Response.success(notice));
});

const addNotice = Middlewares.CatchAsync(async (req, res, next) => {
  const { classId } = req.params;
  const { title, body } = req.body;

  if (
    !title ||
    typeof title !== "string" ||
    !body ||
    typeof body !== "string"
  ) {
    return next(Utils.Response.error("Invalid field types !", 400));
  }

  const cls = await Models.Class.findById(classId);
  if (!cls) {
    return next(Utils.Response.error("No class found with the id !", 400));
  }

  const newNotice = await Models.Notice.create({
    title,
    body,
    class: cls._id,
  });

  const students = await Models.User.find({
    class: cls._id,
    isCr: false,
  });

  if (students.length === 0) {
    return next(Utils.Response.error("No students found in the class !", 400));
  }

  Utils.Notification.sendNotificationToStudents(
    students,
    "You have a new notice"
  );

  return res.json(Utils.Response.success(newNotice));
});

const editNotice = Middlewares.CatchAsync(async (req, res, next) => {
  const { noticeId } = req.params;
  const { title, body } = req.body;

  if (
    (title && typeof title !== "string") ||
    (body && typeof body !== "string")
  ) {
    return next(Utils.Response.error("Invalid field types !", 400));
  }

  const notice = await Models.Notice.findById(noticeId);

  if (!notice) {
    return next(Utils.Response.error("No notice found with the id !", 400));
  }

  const cls = notice.class;
  const students = await Models.User.find({
    class: cls,
    isCr: false,
  });

  if (students.length === 0) {
    return next(Utils.Response.error("No students found in the class !", 400));
  }

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
});

const deleteNotice = Middlewares.CatchAsync(async (req, res) => {
  const { noticeId, classId } = req.params;

  await Models.Notice.findByIdAndDelete(noticeId);
  const notices = await Models.Notice.find({ class: classId });
  return res.json(Utils.Response.success(notices));
});

module.exports = {
  getAllNotices,
  getNotice,
  addNotice,
  editNotice,
  deleteNotice,
};
