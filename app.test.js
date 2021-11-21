const request = require('supertest');
const app = require('./app');

describe('Explore API', () => {
  it('should run', () => {});

})

describe('users endpoints',() => {
  it('GET /users --> array users', () => {
    return request(app)
      .get('/users')
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

});

describe('locations endpoints',() => {
  it('GET /locations --> array locations', () => {
    return request(app)
      .get('/locations')
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

  it('GET /locations/:id --> specific Location Object', () => {});

  it('GET /locations/:id --> 404 when not found', () => {});

  it('POST /locations --> created location', () => {});

  it('GET /locations --> ', () => {});

  it('PUT /locations/:id --> update Location', () => {});

});
