const { getDBInstance } = require('../providers/db');
const supertest = require('supertest');
const { v4: uuidv4 } = require('uuid');
const app = require('../app');
const request = supertest(app);


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

