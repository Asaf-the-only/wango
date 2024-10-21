const { client } = require("../db/pgConnection")
const calculatePrice = require("../services/ParkingPrice/priceCalculatorService")

exports.startParking = async (req, res) => {
  const { email, cityId, parkingAreaId } = req.body

  try {
    const userResult = await client.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    )

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" })
    }

    const userId = userResult.rows[0].id

    const result = await client.query(
      "INSERT INTO parkings (user_id, city_id, parking_area_id, start_time) VALUES ($1, $2, $3, NOW()) RETURNING *",
      [userId, cityId, parkingAreaId]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.stopParking = async (req, res) => {
  const { email, parkingId } = req.body

  try {
    // Fetch the parking record with the city name and parking area
    const parkingResult = await client.query(
      `SELECT parkings.*, cities.name AS city_name, parking_areas.name AS area_name 
       FROM parkings 
       JOIN cities ON parkings.city_id = cities.id 
       JOIN parking_areas ON parkings.parking_area_id = parking_areas.id 
       WHERE parkings.id = $1`,
      [parkingId]
    )

    if (parkingResult.rows.length === 0) {
      return res.status(404).json({ error: "Parking record not found" })
    }

    const parking = parkingResult.rows[0]

    // Calculate the price
    const endTime = new Date()
    const startTime = new Date(parking.start_time)
    const price = calculatePrice(startTime, endTime, parking.city_name)

    // Update the parking record with the end time and price
    const updateResult = await client.query(
      "UPDATE parkings SET end_time = $1, price = $2 WHERE id = $3 RETURNING *",
      [endTime, price, parkingId]
    )

    res.json(updateResult.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get All Parkings for a User
exports.getUserParkings = async (req, res) => {
  const { email } = req.params
  try {
    const userResult = await client.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    )
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" })
    }
    const userId = userResult.rows[0].id
    const result = await client.query(
      "SELECT * FROM parkings WHERE user_id = $1",
      [userId]
    )
    res.json({ parkings: result.rows })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
