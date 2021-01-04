require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

console.log("Hello World");

/**
 * Use body-parser to Parse POST Requests
 */
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * add Middleware logging for every request
 */
app.use(async (req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});

/**
 * add Middleware to use public folder for every request
 */
app.use(express.static(__dirname + "/public"));

/**
 * GET method to show index.html on startup
 */
app.get("/", async (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
})

/**
 * GET method to response JSON with endpoint and environment variables
 */
app.get("/json", async (req, res) => {
    var message = "";
    console.log("env =" + process.env.MESSAGE_STYLE);
    if (process.env.MESSAGE_STYLE == "uppercase") {
        message = "Hello json".toUpperCase();
    } else {
        message = "Hello json";
    }
    res.status(200).send({ "message": message });
})

/**
 * Chain Middleware to Create a Time Server
 */
app.get("/now", function middleware(req, res, next) {
    req.time = new Date().toString();
    next();
}, async (req, res) => {
    res.status(200).send({ "time": req.time });
})

/**
 * Get Route Parameter Input from the Client
 */
app.get("/:word/echo", async (req, res) => {
    var word = req.params.word;
    if (word != null) {
        res.status(200).send({ "echo": word });
    } else {
        res.status(404).send("Parameter word is not specified");
    }
})

/**
 * Get Query Parameter Input from the Client
 */
app.get("/name", async (req, res) => {
    var firstname = req.query.first;
    var lastname = req.query.last;
    if (firstname != null && lastname != null) {
        res.status(200).send({ "name": firstname + " " + lastname });
    } else {
        res.status(404).send("Parameter first and last is not specified");
    }
})

/**
 * Get Data from POST Requests
 */
app.post("/name", async (req, res) => {
    var firstname = req.body.first;
    var lastname = req.body.last;
    console.log(firstname + " " + lastname);
    if (firstname != null && lastname != null) {
        res.status(200).json({ "name": firstname + " " + lastname });
    } else {
        res.status(404).send("Parameter first and last is not specified");
    }
});






































module.exports = app;
