var mongoose = require('mongoose');

var uSchema = new mongoose.Schema({

    username: {type: String, unique: true},
    email: {type: String, require: true},
    password: {type: String, require: true}

});

var user = mongoose.model('myUserModel', uSchema);
module.exports = user;
