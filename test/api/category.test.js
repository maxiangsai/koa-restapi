'use strict';

const app = require('../../src/app');
const request = require('supertest').agent(app.callback());
const setUpMongoDB = require('../setup');
const httpStatus = require('http-status');
const { userOneToken } = require('../mock/token');
const faker = require('faker');
const { insertCategory, categoryOne, categoryTwo } = require('../mock/category');
const { insertUser, userOne } = require('../mock/user');

setUpMongoDB();

describe('Category Routes', () =>{
  describe('GET /categories', () => {
    test('get list --> return 200', async () => {
      await insertCategory([categoryOne]);

      const { body } = await request
        .get('/categories')
        .expect(httpStatus.OK);

      expect(body).toEqual({
        code: 1,
        data: {
          list: expect.any(Array)
        }
      });
      expect(body.data.list[0]).toEqual({
        id: categoryOne._id.toHexString(),
        name: categoryOne.name
      });
    });
  });

  describe('POST /categories', () => {
    test('when params is correct --> return 200', async () =>{
      const newBody = { name: faker.lorem.word() };
      await insertUser([userOne]);
      const { body } = await request
        .post('/categories')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${userOneToken}`)
        .send(newBody)
        .expect(httpStatus.OK);

      expect(body).toEqual({
        code: 1,
        data: {
          id: expect.any(String),
          name: newBody.name
        }
      });
    });

    test('when params is missing --> return 400', async () =>{
      await insertUser([userOne]);
      const { body } = await request
        .post('/categories')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${userOneToken}`)
        .expect(httpStatus.BAD_REQUEST);

      expect(body).toEqual({
        code: 0,
        message: expect.any(String)
      });
    });

    test('when Authorization is missing --> return 401', async () =>{
      const newBody = { name: faker.lorem.word() };
      const { body } = await request
        .post('/categories')
        .set('Authorization', `Bearer ${userOneToken}`)
        .send(newBody)
        .expect(httpStatus.UNAUTHORIZED);

      expect(body).toEqual({
        code: 0,
        message: expect.any(String)
      });
    });
  });

  describe('PATCH /categories/:id', () => {
    test('when params is correct --> return 200', async () => {
      await insertCategory([categoryOne]);
      await insertUser([userOne]);
      const updateBody = { name: faker.lorem.word() };
      const { body } = await request
        .patch(`/categories/${categoryOne._id}`)
        .set('Authorization', `Bearer ${userOneToken}`)
        .send(updateBody)
        .expect(httpStatus.OK);

      expect(body).toEqual({
        code: 1,
        data: {
          name: updateBody.name,
          id: categoryOne._id.toHexString()
        }
      });
    });

    test('when id is not exist --> return 404', async () => {
      await insertCategory([categoryOne]);
      await insertUser([userOne]);
      const updateBody = { name: faker.lorem.word() };
      const { body } = await request
        .patch(`/categories/${categoryTwo._id}`)
        .set('Authorization', `Bearer ${userOneToken}`)
        .send(updateBody)
        .expect(httpStatus.NOT_FOUND);

      expect(body).toEqual({
        code: 0,
        message: expect.any(String)
      });
    });
  });

  describe('DELETE /categories/:id', () => {
    test('when id is exist --> return 200', async () => {
      await insertCategory([categoryOne]);
      await insertUser([userOne]);
      const { body } = await request
        .delete(`/categories/${categoryOne._id}`)
        .set('Authorization', `Bearer ${userOneToken}`)
        .expect(httpStatus.OK);

      expect(body).toEqual({
        code: 1,
        data: {
          name: categoryOne.name,
          id: categoryOne._id.toHexString()
        }
      });
    });

    test('when id is not exist --> return 404', async () => {
      await insertCategory([categoryOne]);
      await insertUser([userOne]);
      const { body } = await request
        .delete(`/categories/${categoryTwo._id}`)
        .set('Authorization', `Bearer ${userOneToken}`)
        .expect(httpStatus.NOT_FOUND);

      expect(body).toEqual({
        code: 0,
        message: expect.any(String)
      });
    });
  });
});
