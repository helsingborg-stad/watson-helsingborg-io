/* eslint-disable no-unused-expressions */
require('dotenv').config({ path: './.env.test' });
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');

const should = chai.should();
chai.use(chaiHttp);

describe('Message', () => {
  after(async () => {
    server.close();
  });

  beforeEach(async () => {
  });

  it('should return json on GET with message query', async () => chai
    .request(server)
    .get('/api/v1/message')
    .send()
    .then((res) => {
      res.should.have.status(200);
      res.should.be.json;
      should.exist(res.body);
    }));
});
