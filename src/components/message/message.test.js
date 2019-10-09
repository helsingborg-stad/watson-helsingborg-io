/* eslint-disable no-unused-expressions */
require('dotenv').config({ path: './.env.test' });
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');

const should = chai.should();
const expect = chai.expect();
chai.use(chaiHttp);

describe('Message', () => {
  after(async () => {
    server.close();
  });

  beforeEach(async () => {
  });

  it('should return json on GET with message query', async () => chai
    .request(server)
    .post('/api/v1/message')
    .send({
      workspaceId: 'ab232ce3-32e3-4a1f-bf70-7beb4f5e1262',
      textInput: 'Mocha unit test message',
    })
    .then((res) => {
      res.should.have.status(200);
      res.should.be.json;
      should.exist(res.body);
      should.exist(res.body.data.attributes.output);
    }));
});
