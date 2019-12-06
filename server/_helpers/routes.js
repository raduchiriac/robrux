const passport = require('passport');

// All for non-GQL routes
module.exports = (server, passport) => {
  server.get('/logout', (req, res) => {
    res.clearCookie('access');
    res.clearCookie('refresh');
    req.logout();
    res.redirect('/');
  });
};
