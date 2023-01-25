const Models = require("../models");
const Utils = require("../utils");

async function createClass(req, res) {
  const { name, email, scholarId, fcmToken, className, studentName } = req.body;

  const user = await Models.User.findOne({ email });
  const randomCode = Utils.Random.generateCode(6);
  let newClass;

  if (!user) {
    const newStudent = await Models.User.create({
      name,
      email,
      scholarId,
      fcmToken,
      isCr: true,
    });

    newClass = await Models.Class.create({
      name: className,
      code: randomCode,
      cr: newStudent._id,
    });

    newStudent.class = newClass._id;
    await newStudent.save();
  } else {
    newClass = await Models.Class.create({
      name: className,
      code: randomCode,
      cr: user._id,
    });

    user.class = newClass._id;
    user.isCr = true;
    user.name = studentName;
    user.fcmToken = fcmToken;
    user.scholarId = scholarId;
    await user.save();
  }
  return res.json(Utils.Response.success(newClass));
}

async function joinClass(req, res, next) {
  const { name, fcmToken, scholarId, email, classCode } = req.body;

  const cls = await Models.Class.findOne({ code: classCode });
  if (!cls) {
    return next(Utils.Response.error("Wrong class code", 400));
  }

  const user = await Models.User.findOne({ email });
  if (!user) {
    await Models.User.create({
      name: name,
      email: email,
      fcmToken: fcmToken,
      scholarId: scholarId,
      class: cls._id,
    });

    return res.json(
      Utils.Response.success("Successfully joined the class", 201)
    );
  }

  user.class = cls._id;
  user.name = name;
  user.fcmToken = fcmToken;
  user.scholarId = scholarId;
  await user.save();
  return res.json(Utils.Response.success("Successfully joined the class", 201));
}

async function getClassInfo(req, res, next) {
  const { classId } = req.params;
  if (!Utils.Mongoose.objectIdChecker(classId)) {
    return next(Utils.Response.error("Invalid Class ID", 400));
  }

  const cls = await Models.Class.findById(classId);

  if (!cls) {
    return next(Utils.Response.error("Class not found", 400));
  }
  return res.json(Utils.Response.success(cls));
}

async function leaveClass(req, res) {
  const { email } = req.params;
  await Models.User.findOneAndDelete({ email });
  return res.json(Utils.Response.success("Class left successfully"));
}

module.exports = { createClass, joinClass, getClassInfo, leaveClass };
