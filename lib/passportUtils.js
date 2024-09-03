const bcrypt = require("bcryptjs");

function validatePassword(password, hash) {
  // if hash not present return false
  if (typeof hash === "undefined") {
    return false;
  }

  let hashVerify = bcrypt.compareSync(password, hash);

  return hashVerify;
}

async function genPassword(password) {
  let salt = await bcrypt.genSalt(10);

  const hash = bcrypt.hashSync(password, salt);

  return hash;
}

module.exports.validatePassword = validatePassword;
module.exports.genPassword = genPassword;
