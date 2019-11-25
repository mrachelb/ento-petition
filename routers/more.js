const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const bc = require("../utils/bc");

router.route("/more").get((req, res) => {
    res.render("more", {
        layout: "main"
    });
});

module.exports = router;
