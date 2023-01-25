function randomNum(high, low = 0) {
  return Math.random() * (high - low) + low;
}

function randomChar() {
  let index = randomNum(62); // 26 + 26 + 10
  if (index < 26) {
    return String.fromCharCode(index + 97); // 'a' - 'z'
  }
  index -= 26;
  if (index < 26) {
    return String.fromCharCode(index + 65); // 'A' - 'Z'
  }
  index -= 26;
  return String.fromCharCode(index + 48); // '0' - '9'
}

function generateCode(length) {
  let str = "";
  for (let i = 0; i < length; i++) str += randomChar();
  return str;
}

module.exports = { randomNum, randomChar, generateCode };
