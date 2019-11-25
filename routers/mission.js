const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const bc = require("../utils/bc");

router.route("/mission").get((req, res) => {
    res.render("mission", {
        layout: "main"
    });
});

module.exports = router;
