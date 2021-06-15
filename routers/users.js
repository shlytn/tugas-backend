const express = require('express')
const router = express.Router()
const users = require('../models/user-schema')
const auth = require('../middlewares/auth')

const adminAuth = (req, res, next) => {
  users.estimatedDocumentCount((err, count) => {
    if(count > 0) 
      auth(req, res, next)
    else 
      next()
  })
}

const ifExist = (req, res, next) => {  
  users.exists({ username: req.body.username }).then(exist => {
    if (exist){
      console.log("Username already Exist, get another username!!!")
      res.sendStatus(409)
    }else{
      next()
    }
  })
}

router.post('/user', adminAuth, ifExist, async (req, res) => {
  let username = req.body.username
  let password = req.body.password

  const user = new users({
    username: username,
    password: password
  })

  await user.save()
  .then(data => {
    console.log(username + " pass " + password)
    res.status(200).json({ _id: data._id, username: req.body.username})
  })
  .catch(err => {
    res.status(401).json({ error: err})
  })
})

router.get('/user', auth, async (req, res) => {
  await users.find().select('-__v')
  .exec((err, data) => {
    if (err) { res.send(err) }
    else { res.status(200).json(data) }
  })
})

router.delete('/user/:id', auth, async (req, res) => {
  await users.findByIdAndRemove(req.params.id)
  .exec((err, result) => {
    if (err) { res.sendStatus(404) }
    else { res.json(result) }
  })
})

module.exports = router