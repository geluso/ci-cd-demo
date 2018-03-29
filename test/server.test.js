require('dotenv').config();

const request = require('superagent');
const URL = 'http://localhost:' + process.env.PORT + '/';
const server = require('../index');

describe('Server Responses', () => {
  beforeAll(done => {
    server.start()
    .then(done)
  });

  afterAll(done => {
    server.stop()
    .then(done)
  });

  it('should return 200 for root', (done) => {
    request.get(URL)
    .end((err, res) => {
      if (err) {
        console.log(err);
      }
      expect(res.status).toEqual(200);
      done();
    });
  });

  it('should contain expected text', (done) => {
    request.get(URL)
    .end((err, res) => {
      if (err) {
        console.log(err);
      }
      let html = 'Welcome! Try to access <a href="/secret">/secret</a> to see a secret recipe!';
      expect(res.text).toEqual(html);
      done();
    });
  });
});
