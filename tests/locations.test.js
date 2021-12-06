const supertest = require("supertest");
const { v4: uuidv4 } = require("uuid");
const app = require("../app");
const request = supertest(app);

// Locations group
const testUUID = uuidv4();
const location = {
  id: testUUID,
  name: "Test",
  lat: "30.000000",
  lon: "40.000000",
  url: "https://google.com",
};

it("POST /locations --> created location", async () => {
  expect.assertions(5);
  const data = await request.post("/locations").send(location);

  expect(data.status).toBe(200);
  expect(data.body.name).toEqual("Test");
  expect(data.body.latitude).toEqual("30.000000");
  expect(data.body.longitude).toEqual("40.000000");
  expect(data.body.url).toEqual("https://google.com");
});

it("GET /locations --> array locations", async () => {
  expect.assertions(2);
  const response = await request.get("/locations");
  expect(response.status).toBe(200);
  expect(response.body).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        _id: expect.any(String),
      }),
    ])
  );
});

it("GET /locations/:id --> find location", async () => {
  expect.assertions(1);
  await request
    .get(`/locations/e788b107-2e5e-44fe-99f5-f9d343e6a994`)
    .expect(200)
    .then((res) => {
      res.body = JSON.parse(res.text);
      expect(res.body._id).toEqual("e788b107-2e5e-44fe-99f5-f9d343e6a994");
    });
});

it("DELETE /locations/:id --> delete location", async () => {
  expect.assertions(1);
  await request
    .delete("/locations/e788b107-2e5e-44fe-99f5-f9d343e6a994")
    .expect(200)
    .then((res) =>
      expect(res.body._id).toEqual("e788b107-2e5e-44fe-99f5-f9d343e6a994")
    );
});

it("GET /locations/:id --> 404 when not found", () => {});

it("GET /locations --> ", () => {});

it("PUT /locations/:id --> update Location", () => {});
