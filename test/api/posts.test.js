'use strict';

require('../helper');
const app = require('../../app');
const { expect } = require('chai');
const request = require('supertest').agent(app.callback());

describe('文章接口', () => {
  describe('新增 /posts', () => {
    it('无token', async () => {
      const { status, body } = await request.post('/posts');
      expect(status).to.equal(401);
      expect(body.code).to.equal(0);
    });
  });

  describe('GET /posts', () => {
    it('GET /post', async () => {
      const { status, body } = await request.get('/posts');
      expect(status).to.equal(200);
      expect(body).to.include.all.keys('code', 'data');
    });
  });
});
