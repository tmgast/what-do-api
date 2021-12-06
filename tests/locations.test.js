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

const hollow_location = {
  name: "Test2",
  lat: "35.000000",
  lon: "45.000000",
};

it("POST /locations/gm --> created location", async () => {
  expect.assertions(4);
  const data = await request.post("/locations/gm")
    .send({
      "url": "https://www.google.com/maps/place/NIFREL,+2-1+Senribanpakukoen,+Suita,+Osaka+565-0826/@34.8062981,135.5336441,16z/data=!4m2!3m1!1s0x6000fcad50479643:0xd55fc65092ad11c7"
    });

  expect(data.status).toBe(200);
  expect(data.body.name).toEqual("NIFREL");
  expect(data.body.latitude).toEqual("34.8062981");
  expect(data.body.longitude).toEqual("135.5336441");
});

it("POST /locations --> created location with minimal info", async () => {
  expect.assertions(4);
  const data = await request.post("/locations").send(hollow_location);

  expect(data.status).toBe(200);
  expect(data.body.name).toEqual("Test2");
  expect(data.body.latitude).toEqual("35.000000");
  expect(data.body.longitude).toEqual("45.000000");
});

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

it("DELETE /locations/:name/byName --> delete location by name", async () => {
  expect.assertions(1);
  await request
    .delete("/locations/byName/Osaka%20Castle")
    .expect(200)
    .then((res) => {
      expect(res.body.deletedCount).toEqual(1)
    });
});

it("PUT /locations/:id --> update Location", async () => {
  expect.assertions(1);
  const data = await request
    .put("/locations/d216bba6-a181-474a-ad26-2fc6f6e5f609")
    .send({ name: "Cheese Hut" })
    .expect(200)
    .then((res) => {
      expect(res.body.name).toEqual("Cheese Hut");
    });
});

it("GET /locations/:id --> 404 when not found", () => {});

it("POST /locations/gm --> 500 invalid GMaps URL", async () => {
  expect.assertions(2);
  const data = await request.post("/locations/gm")
    .send({
      "url": "https://www.facebook.com"
    });

  expect(data.status).toBe(500);
  expect(data.body).toEqual({message: "Invalid URL"});
});

// need more tests for fail-cases
