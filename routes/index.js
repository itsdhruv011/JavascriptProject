var express = require("express")
var router = express.Router()

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", {
        title: "COMP 206, Assignment 2",
        cinema: "Angel CineWorld",
        author: "Dhruv Nitinbhai Vaghasiya",
    })
})

module.exports = router
