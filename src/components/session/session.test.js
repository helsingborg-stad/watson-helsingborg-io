/* eslint-disable no-unused-expressions */
require('dotenv').config({ path: './.env.test' });
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');

const should = chai.should();
chai.use(chaiHttp);

describe('Session', () => {
  after(async () => {
    server.close();
  });

  beforeEach(async () => {
  });

  it('should return json on POST with session ID', async () => chai
    .request(server)
    .post('/api/v1/session')
    .send({
      assistantId: process.env.ASSISTANT_ID,
    })
    .then((res) => {
      res.should.have.status(200);
      res.should.be.json;
      should.exist(res.body);
      should.exist(res.body.data.attributes.session_id);
    }));
});
