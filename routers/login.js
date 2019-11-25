// routers/login.js

const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const bc = require("../utils/bc");

router
    .route("/login")
    .get((req, res) => {
        console.log("GET/login");
        if (req.session.user && req.session.user.id) {
            res.redirect("/petition");
        } else {
            res.render("login", {
                layout: "main"
            });
        }
    })
    .post((req, res) => {
        console.log("POST request login loading...");
        db.checkEmail(req.body.email).then(data => {
            // console.log("my data:", data.rows);
            if (data.rows.length == 1) {
                bc.checkPassword(req.body.password, data.rows[0].password)
                    .then(checked => {
                        if (checked) {
                            console.log("CHECKED");
                            let {
                                first,
                                last,
                                email,
                                id,
                                sigID,
                                age,
                                city,
                                url
                            } = data.rows[0];
                            req.session.user = {
                                first,
                                last,
                                email,
                                id,
                                sigID,
                                age,
                                city,
                                url
                            };
                            res.redirect("/petition");
                        } else {
                            console.log("password incorrect!");
                            res.render("login", {
                                layout: "main",
                                error: "Please enter a valid password"
                            });
                        }
                    })
                    .catch(err => {
                        console.log(
                            "ERROR checking whole user's information: ",
                            err
                        );
                    });
            } else {
                console.log("not a valid email");
                res.render("login", {
                    layout: "main",
                    error: "Please enter a valid email"
                });
            }
        });
    });

module.exports = router;
