const Models = require("../models");
const Utils = require("../utils");

async function getSchedule(req, res, next) {
  const { classId, day } = req.params;
  if (!Utils.Mongoose.objectIdChecker(classId)) {
    return next(Utils.Response.error("Invalid Class ID", 400));
  }

  const schedule = await Models.Schedule.findOne({
    class: classId,
  });
  return res.json(Utils.Response.success(schedule.classes[day]));
}

async function createSchedule(req, res) {
  const { classId, day, time, subject, faculty } = req.body;
  let schedule = await Models.Schedule.findOne({ class: classId });
  const students = await Models.User.find({
    class: classId,
    isCr: false,
  });

  Utils.Notification.sendNotificationToStudents(
    students,
    "CR has added classes to the Routine"
  );

  // Create a new schedule if not present and update
  schedule ||= await Models.Schedule.create({ class: classId, day });

  schedule.classes[day].push({ time, subject, faculty });
  await schedule.save();

  return res.json(Utils.Response.success(schedule));
}

async function updateSchedule(req, res) {
  const { day, scheduleId, scheduleClassId, time, subject, faculty } = req.body;
  const schedule = await Models.Schedule.findById(scheduleId);
  const students = await Models.User.find({
    class: schedule.class,
    isCr: false,
  });

  schedule.classes[day].forEach((cls) => {
    if (cls._id !== scheduleClassId) return;

    cls.time = time ?? cls.time;
    cls.subject = subject ?? cls.subject;
    cls.faculty = faculty ?? cls.faculty;
  });
  await schedule.save();

  Utils.Notification.sendNotificationToStudents(
    students,
    "CR has updated the Routine"
  );

  return res.json(Utils.Response.success(schedule));
}

async function deleteSchedule(req, res) {
  const { scheduleId, scheduleClassId, day } = req.body;
  const schedule = await Models.Schedule.findById(scheduleId);

  schedule.classes[day].forEach((cls) => {
    if (cls._id !== scheduleClassId) return;
    schedule.classes[day].splice(schedule.classes[day].indexOf(cls), 1);
  });

  let classIndex = schedule.classes[day].findIndex(
    (cls) => (cls._id = scheduleClassId)
  );
  schedule.classes[day].splice(classIndex, 1);
  await schedule.save();

  return res.json(Utils.Response.success(schedule));
}

module.exports = {
  getSchedule,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
