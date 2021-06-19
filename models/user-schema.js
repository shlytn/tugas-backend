const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const saltRounds = 10

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    index: { unique: true }
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  }
})

userSchema.pre('save', function(next){
  var user = this
  console.log(this)
  if (!user.isModified('password')) return next()

  bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      console.log(hash)
      next();
    });
  });
})

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

module.exports = mongoose.model('user', userSchema)