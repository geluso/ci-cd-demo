require('dotenv').config();

const serverToggle = require('../lib/server-toggle');
const server = require('../index');

const request = require('superagent');
const PORT = process.env.PORT || 3000;
const URL = 'http://localhost:' + PORT + '/';


describe('Server Responses', () => {
  beforeAll(done => {
    serverToggle.serverOn(server, done);
  });

  afterAll(done => {
    serverToggle.serverOff(server, done);
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
