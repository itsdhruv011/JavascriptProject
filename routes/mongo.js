const express = require("express")
const router = express.Router()

const mongoClient = require("../config/db.js")

// localhost:3000/db/

router.get("/", (req, res) => {
    res.send("<h1>Your Name Goes Here</h1>")
})

// TODO Add a "/collections" route handler that lists the collections available in the sample_mflix database

module.exports = router
