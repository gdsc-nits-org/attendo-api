const { admin } = require("./firebase");

async function sendNotification(token, label) {
  const registrationTokens = token;
  const message = {
    data: {
      body: label,
    },
    tokens: registrationTokens,
  };

  try {
    const res = admin.messaging().sendMulticast(message);
    console.log("Successfully sent message:", res);
  } catch (err) {
    console.log(err);
    console.log("Error sending message:", err);
  }
}

async function sendReminder(token, label, isScheduled, scheduledTime) {
  const registrationTokens = token;
  const message = {
    data: {
      title: label,
      isScheduled: isScheduled,
      scheduledTime: scheduledTime,
    },
    tokens: registrationTokens,
  };

  try {
    const res = admin.messaging().sendMulticast(message);
    console.log("Successfully sent message:", res);
  } catch (err) {
    console.log(err);
    console.log("Error sending message:", err);
  }
}

function sendNotificationToStudents(students, msg) {
  const filtered = students
    .filter((student) => student.fcmToken) // removed null or undefined values
    .map((student) => student.fcmToken);

  if (filtered.length > 0) {
    sendNotification(filtered, msg);
  }
}

module.exports = { sendNotification, sendReminder, sendNotificationToStudents };
