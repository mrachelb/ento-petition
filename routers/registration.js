// routers/registration.js

const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const bc = require("../utils/bc");

router
    .route("/registration")
    .get((req, res) => {
        console.log("GET/registration");
        res.render("registration", {
            layout: "main"
        });
    })
    .post((req, res) => {
        console.log("POST request registration loading...");
        bc.hashPassword(req.body.password).then(hashedPass => {
            db.storeUsers(
                req.body.first,
                req.body.last,
                req.body.email,
                hashedPass
            )
                .then(resultsID => {
                    req.session.user = {};
                    // console.log("RESULTS Registration:", resultsID.rows);
                    var usersID = resultsID.rows[0].id;
                    req.session.user.id = usersID;
                    // console.log("got the data: ", resultsID);
                    res.redirect("/profile");
                })
                .catch(err => {
                    console.log(err);
                    res.render("registration", {
                        layout: "main",
                        error: `Something went wrong ${err}`
                    });
                });
        });
    });

module.exports = router;
