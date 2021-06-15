const users = require('../models/user-schema')

const auth = (req, res, next) => {
  const username = req.headers.username
  const password = req.headers.password

  users.countDocuments({ username: username, password: password }, (err, count) => {
    if (count === 1)
      next()
    else
      res.sendStatus(401)
  })
}

module.exports = auth
