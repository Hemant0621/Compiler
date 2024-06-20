const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://hemantkumar2335h:Hemant12@mydata.wprhwlz.mongodb.net/compiler')

const userSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String
})

const consoleSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    code : String,
    input : String,
    language : String
})

const User = mongoose.model('user',userSchema)
const Console = mongoose.model('console',consoleSchema)

if(mongoose.STATES[mongoose.connection.readyState]){
    console.log("connected to database")
}

module.exports = {
    User,
    Console
}