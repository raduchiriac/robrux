const { validateAccessToken, validateRefreshToken } = require('./validateTokens');
const { createTokens, createCookiesToken } = require('./setTokens');

async function validateTokensMiddleware(req, res, next) {
  const refreshToken = req.cookies['refresh'];
  const accessToken = req.cookies['access'];
  if (!accessToken && !refreshToken) return next();

  const decodedAccessToken = validateAccessToken(accessToken);
  if (decodedAccessToken && decodedAccessToken.user) {
    req.user = decodedAccessToken.user;
    return next();
  }

  const decodedRefreshToken = validateRefreshToken(refreshToken);
  if (decodedRefreshToken && decodedRefreshToken.user) {
    // valid user and user token not invalidated
    // https://github.com/rkotze/rkotze.github.io/blob/master/_posts/2019-12-02-jwt-secure-apollo-client-graphql.md
    // const userRepo = require('../users/users-repository');
    // const user = await userRepo.get({ userId: decodedRefreshToken.user._id });
    // if (!user || user.tokenCount !== decodedRefreshToken.user.count) {
    //   res.clearCookie('access');
    //   res.clearCookie('refresh');
    //   return next();
    // }
    // update the cookies with new tokens
    req.user = decodedRefreshToken.user;
    const cookies = createCookiesToken(user);
    res.cookie(...cookies.access);
    res.cookie(...cookies.refresh);
    return next();
  }
  next();
}

module.exports = validateTokensMiddleware;
