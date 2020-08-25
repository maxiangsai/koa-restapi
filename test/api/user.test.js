'use strict';

require('../helper');
const app = require('../../app');
const request = require('supertest').agent(app.callback());
const User = require('../../models/user');

describe('User Routes', () => {
  let userId;
  beforeAll(async () => {
    userId = null;
    await User.deleteMany({}).exec();
  });
  describe('POST /users/register', () => {
    test('params is correct --> return 200', async () => {
      const params = {
        username: 'tt',
        password: '444'
      };
      const { status, body } = await request.post('/users/register').send(params).set('Content-Type', 'application/x-www-form-urlencoded');
      expect(status).toEqual(200);
      expect(body.code).toEqual(1);
      userId = body.data._id; // eslint-disable-line
    });

    test('params is not correct --> return 400', async () => {
      const params = {
        username: 'tt'
      };
      const { status, body } = await request.post('/users/register').send(params).set('Content-Type', 'application/x-www-form-urlencoded');
      expect(status).toEqual(400);
      expect(body).toHaveProperty('message');
    });
  });

  describe('POST /posts/login', () => {
    test('when params is correct --> return 200', async () => {
      const params = {
        username: 'tt',
        password: '444'
      };
      const { status } = await request.post('/users/login').send(params).set('Content-Type', 'application/x-www-form-urlencoded');
      expect(status).toEqual(200);
    });

    test('when password is not correct --> return 400', async () => {
      const params = {
        username: 'tt',
        password: '45544'
      };
      const { status, body } = await request.post('/users/login').send(params).set('Content-Type', 'application/x-www-form-urlencoded');
      expect(status).toEqual(400);
      expect(body).toHaveProperty('message');
    });

    test('when username is not correct --> return 404', async () => {
      const params = {
        username: 'tt55',
        password: '45544'
      };
      const { status, body } = await request.post('/users/login').send(params).set('Content-Type', 'application/x-www-form-urlencoded');
      expect(status).toEqual(404);
      expect(body).toHaveProperty('message');
    });
  });

  describe('GET /users/:id', () => {
    test('correct --> return 200 and data', async () => {
      const { status, body } = await request.get(`/users/${userId}`);
      expect(status).toEqual(200);
      expect(body.data).toHaveProperty('username');
      expect(body.data).toHaveProperty('avatar');
    });

    test('id is not exist --> return 404', async () => {
      const { status, body } = await request.get('/users/5f3cf0c92a0a5e895886d51e');
      expect(status).toEqual(404);
      expect(body).toHaveProperty('message');
    });
  });
});
