const Models = require("../models");
const Utils = require("../utils");

async function getAllNotices(req, res, next) {
  const { classId } = req.params;
  if (!Utils.Mongoose.objectIdChecker(classId)) {
    return next(Utils.Response.error("Invalid Class ID", 400));
  }

  const notices = await Models.Notice.find({ class: classId });
  return res.json(Utils.Response.success(notices));
}

async function getNotice(req, res) {
  const { noticeId } = req.params;
  const notice = await Models.Notice.findById(noticeId);
  return res.json(Utils.Response.success(notice));
}

async function addNotice(req, res) {
  const { classId } = req.params;
  const { title, body } = req.body;

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

async function editNotice(req, res, next) {
  const { noticeId } = req.params;
  if (!Utils.Mongoose.objectIdChecker(noticeId)) {
    return next(Utils.Response.error("Invalid Notice ID", 400));
  }

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

async function deleteNotice(req, res, next) {
  const { noticeId, classId } = req.params;
  if (!Utils.Mongoose.objectIdChecker(noticeId)) {
    return next(Utils.Response.error("Invalid Notice ID", 400));
  }
  if (!Utils.Mongoose.objectIdChecker(classId)) {
    return next(Utils.Response.error("Invalid Class ID", 400));
  }

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
