const { getDBInstance } = require('../providers/db');
const supertest = require('supertest');
const { v4: uuidv4 } = require('uuid');
const app = require('../app');
const request = supertest(app);

// Locations group
const testUUID = uuidv4();
const location = {
  id: testUUID,
  name: "Test",
  lat: "30.000000",
  lon: "40.000000",
  url: "https://google.com"
};

it('POST /locations --> created location', async () => {
  expect.assertions(5);
  const data = await request.post('/locations').send(location);

  expect(data.status).toBe(200);
  expect(data.body.name).toEqual('Test');
  expect(data.body.latitude).toEqual('30.000000');
  expect(data.body.longitude).toEqual('40.000000');
  expect(data.body.url).toEqual('https://google.com');
});

it('GET /locations --> array locations', async () => {
  expect.assertions(2);
  const response = await request.get('/locations');
  expect(response.status).toBe(200);
  expect(response.body).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        _id: expect.any(String)
      })
    ]));
});

it('GET /locations/:id --> find location', async () => {
  expect.assertions(1);
  await request.get('/locations/'+testUUID)
  .expect(200)
  .then(res => {
    expect(res.body._id).toEqual(location._id);
  });
});

it('DELETE /locations/:id --> delete location', async () => {
  expect.assertions(1);
  await request.delete('/locations/'+testUUID)
  .expect(200)
  .then(res => (expect(res.body._id).toEqual(location._id)));
});


it('GET /locations/:id --> 404 when not found', () => {});

it('GET /locations --> ', () => {});

it('PUT /locations/:id --> update Location', () => {});

