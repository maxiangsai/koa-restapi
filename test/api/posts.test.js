'use strict';

const app = require('../../src/app');
const httpStatus = require('http-status');
const faker = require('faker');
const { userOneToken } = require('../mock/token');
const { insertPost, postOne, postTwo } = require('../mock/post');
const request = require('supertest').agent(app.callback());
const setUpMongoDB = require('../setup');
const { insertUser, userOne } = require('../mock/user');

setUpMongoDB();

describe('Posts Routes', () => {
  describe('POST /posts', () => {
    let newPost;
    beforeEach(async () => {
      newPost = {
        title: faker.lorem.words(),
        content: faker.lorem.paragraph()
      };
    });

    test('when token is not correct --> return 401', async () => {
      const { body } = await request
        .post('/posts')
        .send(newPost)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${userOneToken}`)
        .expect(httpStatus.UNAUTHORIZED);

      expect(body).toEqual({
        code: 0,
        message: expect.any(String)
      });
    });

    test('when token is correct --> return 200', async () => {
      await insertUser([userOne]);
      const { body } = await request
        .post('/posts')
        .send(newPost)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${userOneToken}`)
        .expect(httpStatus.OK);

      expect(body).toEqual({
        code: 1,
        data: {
          content: newPost.content,
          title: newPost.title,
          state: expect.any(Number),
          id: expect.any(String),
          cover: expect.any(String)
        }
      });
    });
  });

  describe('GET /posts', () => {
    test('default option get list --> return 200', async () => {
      await insertPost([postOne]);
      const { body } = await request.get('/posts').expect(httpStatus.OK);
      expect(body).toEqual({
        code: 1,
        data: {
          list: expect.any(Array),
          total: 1,
          totalPage: 1
        }
      });
      expect(body.data.list).toHaveLength(1);
      expect(body.data.list[0]).toEqual({
        id: postOne._id.toHexString(),
        title: postOne.title,
        content: postOne.content,
        cover: expect.any(String),
        state: postOne.state
      });
    });
  });

  describe('GET /posts/:id', () => {
    test('when id is exist --> return 200', async () => {
      await insertPost([postOne]);
      const { body } = await request
        .get(`/posts/${postOne._id}`)
        .expect(httpStatus.OK);

      expect(body).toEqual({
        code: 1,
        data: {
          id: postOne._id.toHexString(),
          title: postOne.title,
          content: postOne.content,
          cover: expect.any(String),
          state: postOne.state
        }
      });
    });

    test('when id is not exist --> return 404', async () => {
      const { body } = await request
        .get(`/posts/${postTwo._id}`)
        .expect(httpStatus.NOT_FOUND);

      expect(body).toEqual({
        code: 0,
        message: expect.any(String)
      });
    });
  });

  describe('PATCH /posts/:id', () => {
    test('when id and params is correct --> return 200', async () => {
      await insertPost([postOne]);
      await insertUser([userOne]);
      const updateBody = { title: faker.lorem.words(), content: faker.lorem.paragraph() };
      const { body } = await request
        .patch(`/posts/${postOne._id}`)
        .set('Authorization', `Bearer ${userOneToken}`)
        .send(updateBody)
        .expect(httpStatus.OK);

      expect(body).toEqual({
        code: 1,
        data: {
          id: postOne._id.toHexString(),
          title: updateBody.title,
          content: updateBody.content,
          state: postOne.state,
          cover: expect.any(String)
        }
      });
    });

    test('when id is correct but params is missing --> return 400', async () => {
      await insertPost([postOne]);
      await insertUser([userOne]);
      const { body } = await request
        .patch(`/posts/${postOne._id}`)
        .set('Authorization', `Bearer ${userOneToken}`)
        .send()
        .expect(httpStatus.BAD_REQUEST);

      expect(body).toEqual({
        code: 0,
        message: expect.any(String)
      });
    });
  });

  describe('DELETE /posts/:id', () => {
    test('when id is not exist --> return 404', async () => {
      await insertPost([postOne]);
      await insertUser([userOne]);
      const { body } = await request
        .delete(`/posts/${postTwo._id}`)
        .set('Authorization', `Bearer ${userOneToken}`)
        .expect(httpStatus.NOT_FOUND);
      expect(body).toEqual({
        code: 0,
        message: expect.any(String)
      });
    });

    test('when id is exist --> return 200', async () => {
      await insertPost([postOne]);
      await insertUser([userOne]);
      const { body } = await request
        .delete(`/posts/${postOne._id}`)
        .set('Authorization', `Bearer ${userOneToken}`)
        .expect(httpStatus.OK);

      expect(body.code).toEqual(1);
      expect(body.data).toEqual({
        id: postOne._id.toHexString(),
        title: postOne.title,
        content: postOne.content,
        cover: expect.any(String),
        state: postOne.state
      });
    });
  });
});
