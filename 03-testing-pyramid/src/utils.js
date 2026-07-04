// A plain utility function with no framework or network dependency at all -
// this is the classic shape of something a UNIT test covers.
function isValidCredentials(username, password) {
  return Boolean(username) && Boolean(password) && password.length >= 4;
}

module.exports = { isValidCredentials };
