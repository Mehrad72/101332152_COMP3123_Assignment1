
const database = require('../schemas/data.js');
const userInfo = database.User;
const express = require('express');
const route = express.Router();

route.post('/signup', (req, res) => {
    const user = new userInfo(req.body);
    user.save().then((user) => {
        res.send(user);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "couldnt add the user."
        });
    });
});

route.post('/login', (req, res) => {
    try
    {
        userInfo.findOne({username: req.body.username, password: req.body.password}).then((user) => {
            if(user)
            {
                res.status(200).send({user,  message: "user logged in successfully."});
            }
            else
            {
                res.status(500).send({
                    message: "Invalid username and password"
                });
            }
        })
    }
    catch (err)
    {
        res.status(500).send({
            message: err.message || "couldnt find the user."
        });
    }

});


module.exports = route;