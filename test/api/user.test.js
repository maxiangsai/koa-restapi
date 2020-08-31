'use strict';

const faker = require('faker');
const app = require('../../src/app');
const request = require('supertest').agent(app.callback());
const {
  userOne, insertUser, userTwo
} = require('../mock/user');
const httpStatus = require('http-status');
const setUpMongoDB = require('../setup');

setUpMongoDB();

describe('User Routes', () => {
  describe('POST /users/register', () => {
    let newUser;
    beforeEach(async () => {
      newUser = {
        username: faker.name.findName(),
        password: 'password1',
        role: 'user'
      };
    });

    test('params is correct --> return 200', async () => {
      const { body } = await request.post('/users/register').send(newUser)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .expect(httpStatus.OK);

      expect(body).not.toHaveProperty('password');
      expect(body).toEqual({
        code: 1,
        data: {
          id: expect.anything(),
          avatar: expect.any(String),
          role: newUser.role,
          username: newUser.username,
          createdAt: expect.any(String)
        }
      });
    });

    test('password is missing --> return 400', async () => {
      delete newUser.password;
      const { body } = await request
        .post('/users/register')
        .send(newUser)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .expect(httpStatus.BAD_REQUEST);

      expect(body).toHaveProperty('message');
    });
  });

  describe('POST /users/login', () => {
    const { _id, role, ...rest } = userOne;

    test('when params is correct --> return 200', async () => {
      await insertUser([userOne]);
      const { body } = await request
        .post('/users/login')
        .send(rest)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .expect(httpStatus.OK);

      expect(body).toEqual({
        code: 1,
        data: expect.any(String)
      });
    });

    test('when password is not correct --> return 400', async () => {
      await insertUser([userOne]);
      const { body } = await request
        .post('/users/login')
        .send({ ...rest, password: 'xxx' })
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .expect(httpStatus.BAD_REQUEST);

      expect(body).toHaveProperty('message');
    });

    test('when username is not correct --> return 404', async () => {
      const { body } = await request
        .post('/users/login')
        .send({ ...rest, username: faker.name.findName() })
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .expect(httpStatus.NOT_FOUND);

      expect(body).toHaveProperty('message');
    });
  });

  describe('GET /users/:id', () => {
    test('correct --> return 200 and data', async () => {
      await insertUser([userOne]);
      const { body } = await request.get(`/users/${userOne._id}`).expect(httpStatus.OK);

      expect(body).toEqual({
        code: 1,
        data: {
          id: userOne._id.toHexString(),
          role: userOne.role,
          avatar: expect.any(String),
          username: userOne.username,
          createdAt: expect.any(String)
        }
      });
    });

    test('id is not exist --> return 404', async () => {
      const { body } = await request
        .get(`/users/${userTwo._id}`)
        .expect(httpStatus.NOT_FOUND);
      expect(body).toHaveProperty('message');
    });
  });
});
