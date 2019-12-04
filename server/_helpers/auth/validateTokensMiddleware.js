const { validateAccessToken, validateRefreshToken } = require('./validateTokens');
const { setTokens } = require('./setTokens');

async function validateTokensMiddleware(req, res, next) {
  const refreshToken = req.headers['x-refresh-token'];
  const accessToken = req.headers['x-access-token'];
  if (!accessToken && !refreshToken) return next();

  const decodedAccessToken = validateAccessToken(accessToken);
  if (decodedAccessToken && decodedAccessToken.user) {
    req.user = decodedAccessToken.user;
    return next();
  }

  const decodedRefreshToken = validateRefreshToken(refreshToken);
  if (decodedRefreshToken && decodedRefreshToken.user) {
    // https://github.com/rkotze/rkotze.github.io/blob/master/_posts/2019-12-02-jwt-secure-apollo-client-graphql.md
    // const userRepo = require('../users/users-repository');
    // const user = await userRepo.get({ userId: decodedRefreshToken.user._id });
    // valid user and user token not invalidated
    // if (!user || user.tokenCount !== decodedRefreshToken.user.count) {
    //   res.clearCookie('access');
    //   res.clearCookie('refresh');
    //   return next();
    // }
    req.user = decodedRefreshToken.user;
    // refresh the tokens
    const userTokens = setTokens(decodedRefreshToken.user);
    res.set({
      'Access-Control-Expose-Headers': 'x-access-token,x-refresh-token',
      'x-access-token': userTokens.accessToken,
      'x-refresh-token': userTokens.refreshToken,
    });
    return next();
  }
  next();
}

module.exports = validateTokensMiddleware;
