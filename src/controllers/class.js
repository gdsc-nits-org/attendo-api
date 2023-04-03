const Models = require("../models");
const Utils = require("../utils");
const Middlewares = require("../middlewares");

const createClass = Middlewares.CatchAsync(async (req, res, next) => {
  const { name, email, scholarId, fcmToken, className, studentName } = req.body;

  if (
    !name ||
    typeof name !== "string" ||
    !email ||
    typeof email !== "string" ||
    !scholarId ||
    typeof scholarId !== "string" ||
    !fcmToken ||
    typeof fcmToken !== "string" ||
    !className ||
    typeof className !== "string" ||
    !studentName ||
    typeof studentName !== "string"
  ) {
    return next(Utils.Response.error("Invalid Field Types !", 400));
  }

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
});

const joinClass = Middlewares.CatchAsync(async (req, res, next) => {
  const { name, fcmToken, scholarId, email, classCode } = req.body;
  if (
    !name ||
    typeof name !== "string" ||
    !email ||
    typeof email !== "string" ||
    !scholarId ||
    typeof scholarId !== "string" ||
    !fcmToken ||
    typeof fcmToken !== "string" ||
    !classCode ||
    typeof classCode !== "string"
  ) {
    return next(Utils.Response.error("Invalid field types !", 400));
  }

  const cls = await Models.Class.findOne({ code: classCode });
  if (!cls) {
    return next(Utils.Response.error("Wrong class code !", 400));
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
      Utils.Response.success("Successfully joined the class !", 201)
    );
  }

  user.class = cls._id;
  user.name = name;
  user.fcmToken = fcmToken;
  user.scholarId = scholarId;
  await user.save();
  return res.json(
    Utils.Response.success("Successfully joined the class.", 201)
  );
});

const getClassInfo = Middlewares.CatchAsync(async (req, res, next) => {
  const { classId } = req.params;

  const cls = await Models.Class.findById(classId);
  if (!cls) {
    return next(Utils.Response.error("Class not found !", 400));
  }

  return res.json(Utils.Response.success(cls));
});

const leaveClass = Middlewares.CatchAsync(async (req, res, next) => {
  const { email } = req.params;

  const cls = await Models.User.findOneAndDelete({ email });
  if (!cls) {
    return next(Utils.Response.error("No such class exists !", 400));
  }

  return res.json(Utils.Response.success("Class left successfully."));
});

module.exports = { createClass, joinClass, getClassInfo, leaveClass };
