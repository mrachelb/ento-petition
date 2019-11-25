// routers/petition.js

const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const bc = require("../utils/bc");

router
    .route("/petition")
    .get((req, res) => {
        if (!req.session.user) {
            res.redirect("/registration");
            return;
        } else if (!req.session.user.sigID) {
            // console.log("Else if: ", req.session);
            res.render("petition", {
                // csrfToken: req.csrfToken();
                layout: "main",
                siteName: "petition"
            });
        } else {
            // console.log("Else: ", req.session);
            res.redirect("/petition/signed");
        }
    })
    .post((req, res) => {
        console.log("POST request petition loading..");
        db.addSignature(req.session.user.id, req.body.signature)
            .then(data => {
                req.session.sigID = data.rows[0].id;
                res.redirect("/petition/signed");
            })
            .catch(err => {
                console.log("this is the err", err);
            });
    });

router.route("/petition/signed").get((req, res) => {
    db.imageFile(req.session.user.id).then(results => {
        // console.log("results from signed ", results);
        var sigImage = results.rows[0].signature;
        req.session.user.sigID = results.rows[0].id;
        // console.log("user city", req.params);
        db.check()
            .then(results => {
                res.render("signed", {
                    layout: "main",
                    count: results.rows[0].count,
                    signatureImg: sigImage
                    // userCity: results.rows[0].city
                });
            })
            .catch(err => {
                console.log("err", err);
            });
    });
});

router.route("/petition/signers").get((req, res) => {
    db.listOfSigners()
        .then(list => {
            // console.log("signers result: ", list.rows);

            res.render("signers", {
                layout: "main",
                rowCount: list.rowCount,
                listOfSigners: list.rows
            });
        })
        .catch(err => {
            console.log("err", err);
        });
});

router.route("/petition/signers/:city").get((req, res) => {
    const city = req.params.city;
    // console.log("my object: ", req.params);
    db.signersByCity(city)
        .then(cityusers => {
            res.render("signers", {
                layout: "main",
                listOfSigners: cityusers.rows
            });
        })
        .catch(err => {
            console.log("error: ", err);
        });
});

module.exports = router;
