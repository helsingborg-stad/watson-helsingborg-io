/* eslint-disable no-unused-expressions */
require('dotenv').config({ path: './.env.test' });
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');

const should = chai.should();
const { ASSISTANT_ID } = process.env;

chai.use(chaiHttp);

describe('Message', () => {
  after(async () => {
    server.close();
  });

  beforeEach(async () => {
  });

  it('should return json on POST with message query', async () => chai
    .request(server)
    .post('/api/v1/message')
    .send({
      assistantId: ASSISTANT_ID,
      textInput: 'Mocha unit test message',
    })
    .then((res) => {
      res.should.have.status(200);
      res.should.be.json;
      should.exist(res.body);
      should.exist(res.body.data.attributes.output);
    }));

  it('should return 422 on /message POST without sessionId or assistantId', async () => chai
    .request(server)
    .post('/api/v1/message')
    .send({
      textInput: 'Mocha unit test message',
    })
    .then((res) => {
      res.should.have.status(422);
      res.should.be.json;
      should.exist(res.body);
      should.exist(res.error);
    }));

  it('should return 404 on /message POST without valid sessionId', async () => chai
    .request(server)
    .post('/api/v1/message')
    .send({
      assistantId: ASSISTANT_ID,
      textInput: 'Mocha unit test message',
      sessionId: '5e400f55-afbe-4576-8473-c4d65786350b',
    })
    .then((res) => {
      res.should.have.status(404);
      res.should.be.json;
      should.exist(res.body);
      should.exist(res.error);
    }));
});
