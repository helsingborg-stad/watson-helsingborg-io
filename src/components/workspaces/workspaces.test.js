/* eslint-disable no-unused-expressions */
require('dotenv').config({ path: './.env.test' });
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');

const should = chai.should();
chai.use(chaiHttp);

describe('Workspaces', () => {
  after(async () => {
    server.close();
  });

  beforeEach(async () => {
  });

  it('should return json on GET with workspaces query', async () => chai
    .request(server)
    .get('/api/v1/workspaces')
    .send()
    .then((res) => {
      res.should.have.status(200);
      res.should.be.json;
      should.exist(res.body);
    }));
});
