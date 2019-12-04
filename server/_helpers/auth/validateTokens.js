const { verify } = require('jsonwebtoken');

function validateAccessToken(token) {
  try {
    return verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

function validateRefreshToken(token) {
  try {
    return verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

module.exports = { validateAccessToken, validateRefreshToken };
