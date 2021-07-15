const express = require("express");
const mongoose = require("mongoose");

const app = express();

const mongoUri = "mongodb+srv://sumit-prod:passwordpassword@cluster0.0dw7l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.connection.on("connected", () => {
    console.log("Connected to mongo");
});

mongoose.connection.on("error", (err) => {
    console.log("Connected to mongo", err);
});



app.get("/", (req, res) => {

    res.send('Hi there!');

});

app.listen(3000, () => {
    console.log("Listening of 3000")
});