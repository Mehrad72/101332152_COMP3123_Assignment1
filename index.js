const express = require('express');
const mongoose = require('mongoose');
const route = express();
const rand = '1071049710297110495051'
const port = 2772;
const bodyParser = require('body-parser');
route.use(bodyParser.urlencoded({ extended: true }))
route.use(bodyParser.json())
const DB_URL = 'mongodb+srv://mehrad72:yZCk4KpLViZgXQP5@data-base.6fusqhj.mongodb.net/?retryWrites=true&w=majority';
route.use("/api/user", require("./routes/users.js"))
route.use("/api/emp", require("./routes/employees.js"))

mongoose.Promise = global.Promise;


mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

route.get('/', (req, res) => {
    res.send("<h1>Assignment1 FullStack</h1>");
});

route.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
});