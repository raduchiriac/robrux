const { sign } = require('jsonwebtoken');

function setTokenCookies(user) {
  const toEncode = Object.assign({}, { _id: user._id, email: user.email });
  const tokens = setTokens(toEncode);
}

function setToken({ accessToken, refreshToken }) {
  const cookieOptions = {
    httpOnly: true,
    domain: process.env.HOSTNAME,
    secure: process.env.NODE_ENV === 'production',
    SameSite: 'Lax',
  };
  return {
    access: ['access', accessToken, cookieOptions],
    refresh: ['refresh', refreshToken, cookieOptions],
  };
}

function setTokens(user) {
  const refreshTokenExpire = 1000 * 60 * 60 * 24 * 7; // 7 days
  const accessTokenExpire = 60 * 15 * 1000; // 15 min;
  const accessUser = {
    id: user._id,
  };
  const accessToken = sign({ user: accessUser }, process.env.JWT_SECRET, {
    expiresIn: accessTokenExpire,
  });
  const refreshUser = {
    id: user._id,
    count: user.tokenCount || 0,
  };
  const refreshToken = sign({ user: refreshUser }, process.env.JWT_SECRET, {
    expiresIn: refreshTokenExpire,
  });

  return { accessToken, refreshToken };
}

module.exports = { setTokens, setTokenCookies };
