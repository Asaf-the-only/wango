const { client } = require('../db/pgConnection');

exports.registerUser = async (req, res) => {
  const { email, fullName, address, carPlateNumber } = req.body
  try {
    const result = await client.query(
      "INSERT INTO users (email, full_name, address, car_plate_number) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, fullName, address, carPlateNumber]
    )
    res.status(201).json({ message: "User registered", user: result.rows[0] })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.loginUser = async (req, res) => {
  const { email, carPlateNumber } = req.body
  try {
    const result = await client.query(
      "SELECT * FROM users WHERE email = $1 AND car_plate_number = $2",
      [email, carPlateNumber]
    )
    if (result.rows.length > 0) {
      res.json({ message: "User logged in", user: result.rows[0] })
    } else {
      res.status(401).json({ message: "Invalid credentials" })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
