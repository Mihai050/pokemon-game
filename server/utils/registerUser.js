
const mongoose = require("mongoose");
const User = require("../User");

const register =  async function (object){
    const user = new User({
    name: object.username,
    email: object.email,
    password: object.password,
});
    await user.save();
    return true;
}

module.exports = register;

