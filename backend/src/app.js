const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const userRoutes = require("./routes/userRoutes")
const parkingRoutes = require("./routes/parkingRoutes")
const { invokePgConnection } = require("./db/pgConnection")

const app = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(bodyParser.json())

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`)
  next()
})

invokePgConnection()
  .then(() => {
    console.log("PostgreSQL connection established.")

    // Routes
    app.use("/api/users", userRoutes)
    app.use("/api/parking", parkingRoutes)

    // Start the server
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.error("Failed to establish PostgreSQL connection:", err.message)
  })
