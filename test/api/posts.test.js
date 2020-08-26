'use strict';

require('../helper');
const app = require('../../src/app');
const request = require('supertest').agent(app.callback());

describe('Posts Routes', () => {
  describe('POST /posts', () => {
    test('when not authenticated --> return 401', async () => {
      const { status, body } = await request.post('/posts');
      expect(status).toEqual(401);
      expect(body.code).toEqual(0);
    });

    // it('when authenticated --> create success', async () => {
    //   const params = {
    //     username: 'ma',
    //     password: '123'
    //   };
    //   const user = await request.post('/users/login').send(params);
    //   console.log(user.body);
    // });
  });

  describe('GET /posts', () => {
    test('return list', async () => {
      const { status, body } = await request.get('/posts');
      expect(status).toEqual(200);
      expect(body).toHaveProperty('code');
      expect(body).toHaveProperty('data');
    });
  });

  describe('GET /posts/:id', () => {
    test('when id is not exist', async () => {
      const params = { id: 12 };
      const { status, body } = await request.get(`/posts/${params.id}`);
      expect(status).toEqual(404);
      expect(body.code).toEqual(0);
    });
  });
});
