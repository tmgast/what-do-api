const app = require('./app');
const supertest = require('supertest');
const { v4: uuidv4 } = require('uuid');
const { initDB } = require('./middleware/db');
const { MongoMemoryServer } = require('mongodb-memory-server');

initDB();

const request = supertest(app);

it('should run', async () => {
  await request.get('/').expect(200)
});


// Users group
it('GET /users --> array users', async () => {
  await request.get('/users')
    .expect("Content-Type", /json/)
    .expect(200)
    .then(response => {
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
            id: expect.any(String)
          })
      ]))
    })
});

it('GET /users/id --> specific User Object', () => {});

it('GET /users/id --> 404 when not found', () => {});

it('POST /users --> created User', () => {});

it('GET /users --> ', () => {});

it('PUT /users/id --> update User', () => {});

// Locations group
const testUUID = uuidv4();
const location = {
  _id: testUUID,
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
  const data = await request.get('/locations');

  expect(data.status).toBe(200);
  expect(data.body).toEqual(
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
  .then(res => (expect(res.body).toEqual(location)));
});

it('DELETE /locations/:id --> delete location', async () => {
  expect.assertions(1);
  await request.delete('/locations/'+testUUID)
  .expect(200)
  .then(res => (expect(res.body).toEqual(location)));
});


it('GET /locations/:id --> 404 when not found', () => {});

it('GET /locations --> ', () => {});

it('PUT /locations/:id --> update Location', () => {});
