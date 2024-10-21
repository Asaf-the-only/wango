const express = require("express")
const parkingController = require("../controllers/parkingController")
const router = express.Router()

router.get("/user-parkings/:email", parkingController.getUserParkings)

router.post("/start-parking", parkingController.startParking)
router.post("/stop-parking", parkingController.stopParking)

module.exports = router
