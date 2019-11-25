const express = require("express");
const hb = require("express-handlebars");
// const db = require("./db");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("./public"));

app.engine("handlebars", hb());
app.set("view engine", "handlebars");

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.get("/petition", (req, res) => {
    console.log("loading");
    res.render("petition", {
        layout: "main",
        siteName: "PETITION"
    });
});

app.post("/petition", (req, res) => {
    if (req.body.first_name) {
        console.log("post first name: ", req.body.first_name);
    }
    if (req.body.last_name) {
        console.log("post last name: ", req.body.last_name);
    }
    db.addCity("Berlin", "DE").then(() => {
        res.redirect("/signed");
    });
});

app.get("/petition/signed", (req, res) => {
    res.render("signed", {
        layout: "main"
    });
});
app.get("/petition/signers", (req, res) => {
    res.render("signers", {
        layout: "main"
    });
});

app.listen(8080, () => {
    console.log("Listening!!");
});
