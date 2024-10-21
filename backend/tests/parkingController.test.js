const { startParking } = require("../src/controllers/parkingController")
const { client } = require("../src/db/pgConnection")

jest.mock("../src/db/pgConnection", () => ({
  client: {
    query: jest.fn(),
  },
}))

describe("startParking", () => {
  it("should start parking for a user and return the parking record", async () => {
    const req = {
      body: {
        email: "user@domain.com",
        cityId: 1,
        parkingAreaId: 2,
      },
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    client.query
      .mockResolvedValueOnce({ rows: [{ id: 1 }] })
      .mockResolvedValueOnce({
        rows: [
          {
            id: 1,
            user_id: 1,
            city_id: 1,
            parking_area_id: 2,
            start_time: new Date(),
          },
        ],
      })

    // Call the controller function
    await startParking(req, res)

    // Assertions
    expect(client.query).toHaveBeenCalledTimes(2) // 1.user lookup 2.parking insert
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      user_id: 1,
      city_id: 1,
      parking_area_id: 2,
      start_time: expect.any(Date),
    })
  })
})
