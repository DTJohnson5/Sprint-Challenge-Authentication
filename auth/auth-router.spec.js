const dBase = require("../database/dbConfig.js");
const test = require("supertest");
const server = require("../api/server.js");
const User = require('./model.js');
const jokes = require('../jokes/jokes-router.js');

describe('Users model', () => {
  beforeEach(async () => {

      await dBase('users').truncate();
  });
  
  describe('insert function', () => {
      it('Should retrieve a user by their username', async () => {
          const UserNumber = await dBase('users');
          expect(UserNumber).toHaveLength(0);
          await User.findBy({ username: 'Stygian', password: 'Just4Me!' });
          expect(UserNumber).toHaveLength(0)
      });
  });

  describe('Post /users', function () {
      it('Should register the member to the database', function () {
          test(server)
              .post('/register')
              .send({username: 'Stygian', password: 'Just4Me!'})

              .expect('Content-Type', /json/)
              .expect(201)
      });
  });

  describe('Post /users', function () {
      it('Should allow authorized users to view JSON-formatted jokes in the database', function () {
          test(server)
              .post('/login')
              .send({username: 'Stygian', password: 'Just4Me!' })

              .expect('Content-Type', /json/)
              .expect(201)
      });
  });

  describe('Post /users', function () {
      it('responds with json', function () {
          test(jokes)
              .get('/jokes')

              .expect('Content-Type', /json/)
              .expect(201)
      });
  });
}); 