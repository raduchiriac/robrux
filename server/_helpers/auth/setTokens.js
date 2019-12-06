const { sign } = require('jsonwebtoken');

function whatToEncode(user) {
  return Object.assign({}, { _id: user._id, email: user.email });
}

function createCookieTokens(user) {
  const { accessToken, refreshToken } = createTokens(whatToEncode(user));
  const cookieOptions = {
    httpOnly: true,
    domain: process.env.HOSTNAME,
    secure: process.env.NODE_ENV === 'production',
    SameSite: 'Lax',
  };
  const cookiesWithTokens = {
    access: ['access', accessToken, cookieOptions],
    refresh: ['refresh', refreshToken, cookieOptions],
  };

  return cookiesWithTokens;
}

function createTokens(user) {
  const accessTokenExpire = 60 * 15 * 1000; // 15 min
  const refreshTokenExpire = 1000 * 60 * 60 * 24 * 7; // 7 days
  const accessUser = whatToEncode(user);
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

module.exports = { createTokens, createCookieTokens };
