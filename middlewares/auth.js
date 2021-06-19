const users = require('../models/user-schema')
const bcrypt = require('bcryptjs')
const saltRounds = 10

const auth = (req, res, next) => {
  const username = req.headers.username
  var password = req.headers.password

  users.countDocuments({ username: username }, (err, count) => {
    if (count === 1){
      users.findOne({ username: username }, (err, user) => {
        if (err) console.log(err)
        user.comparePassword(password, (err, isMatch) => {
          console.log(`${password} ${isMatch}`)
          if (isMatch) next()
          else { res.sendStatus(401) }
        })
      })
    }
    else{
      res.sendStatus(401)
    }
  })
}

module.exports = auth
