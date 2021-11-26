const supertest = require('supertest');
const { initDB, shutdownDB, getDBInstance } = require('../providers/db');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const request = supertest(app);

beforeAll(async () => {
  if (process.platform === 'android') {
    return await initDB();
  } else {
    db = await MongoMemoryServer.create();
    return await initDB(db.getUri());
  }
});

afterAll(async () => {
  if (process.platform !== 'android') {
    console.log('safe delete');
  }
  // console.log(getDBInstance().connection);
  await getDBInstance().connection.close();
});

