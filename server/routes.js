const passport = require('passport')

// Basically for NON-gql routes

module.exports = (server, passport) => {
  server.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })
}
