// /routers/profile.js

const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const bc = require("../utils/bc");
// const { requireNoSignature } = require("../middleware");

// router.use(requireNoSignature);

router
    .route("/profile")
    .get((req, res) => {
        if (!req.session.user) {
            res.redirect("/registration");
        }
        if (
            req.session.user &&
            !req.session.user.age &&
            !req.session.user.city &&
            !req.session.user.url
        ) {
            res.render("profile", {
                layout: "main"
            });
        } else {
            res.redirect("/profile/edit");
        }
    })
    .post((req, res) => {
        let url = req.body.homepage;
        if (
            !url.startsWith("//") &&
            !url.startsWith("http://") &&
            !url.startsWith("https://") &&
            url
        ) {
            url = "http://" + url;
        }
        if (req.body.age || req.body.city || req.body.homepage) {
            db.storeProfile(
                req.body.city,
                req.body.age,
                url,
                req.session.user.id
            )
                .then(results => {
                    res.redirect("/petition");
                })
                .catch(err => {
                    res.render("profile", {
                        layout: "main",
                        error: `Something went wrong ${err}`
                    });
                });
        }
    });

router
    .route("/profile/edit")
    .get((req, res) => {
        if (req.session && req.session.user && req.session.user.id) {
            db.getUserProfile(req.session.user.id)
                .then(prof => {
                    req.session.user = prof.rows[0];
                    res.render("edit", {
                        layout: "main",
                        user: req.session.user,
                        signature: prof.rows[0].signature
                    });
                })
                .catch(err => {
                    console.log("My get edit catch error", err);
                });
        }
    })
    .post((req, res) => {
        if (req.session && req.session.user && req.session.user.id) {
            let {
                first,
                last,
                email,
                password,
                age,
                city,
                homepage
            } = req.body;
            let userid = req.session.user.id;
            if (password) {
                return bc
                    .hashPassword(password)
                    .then(hashedPass => {
                        return Promise.all([
                            db.updateUser(
                                userid,
                                first,
                                last,
                                email,
                                hashedPass
                            ),
                            db.upsetUserProfile(userid, age, city, homepage)
                        ]);
                    })
                    .then(() => {
                        res.redirect("/petition");
                    })
                    .catch(err => {
                        console.log("error from edit", err);
                    });
            } else {
                return Promise.all([
                    db.updateUser(userid, first, last, email),
                    db.upsetUserProfile(userid, age, city, homepage)
                ])
                    .then(() => {
                        res.redirect("/petition");
                    })
                    .catch(err => {
                        console.log("got an error HERE!", err);
                    });
            }
        }
    });

module.exports = router;
