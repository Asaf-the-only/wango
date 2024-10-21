import React from "react"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import StartParking from "./components/StartParking"
import StopParking from "./components/StopParking"
import "./App.css"

function App() {
  return (
    <Router>
      <div>
        {/* Navigation Links */}
        <nav>
          <ul>
            <li>
              <Link to="/start-parking">Start Parking</Link>
            </li>
            <li>
              <Link to="/stop-parking">Stop Parking</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<div>Home Page</div>} />{" "}
          <Route path="/start-parking" element={<StartParking />} />
          <Route path="/stop-parking" element={<StopParking />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
