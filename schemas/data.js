const mongoose = require('mongoose');
const userInfo = new mongoose.Schema({
    username: {
        type: String,
        _id: false,
        unique: true,
        maxLength: 50,
        required: true,
    },
    email: {
        type: String,
        maxLength: 50,
        unique:true,
        required: true,
        lowercase:true,
    },
    password: {
        type: String,
        maxLength: 50,
        required: true
    },
});
const User = mongoose.model('user', userInfo)

const employeeInfo = new mongoose.Schema({
    first_name: { type: String,maxLength: 100, required: true },
    last_name: { type: String, maxLength: 50, required: true },
    email: { type: String, maxLength: 50, unique:true, required: true, lowercase:true},
    gender: { type: String, maxLength: 25, required: true },
    salary: { type: Number, required: true}
});
const Employees = mongoose.model('employees', employeeInfo)
module.exports = {
    User,
    Employees
}