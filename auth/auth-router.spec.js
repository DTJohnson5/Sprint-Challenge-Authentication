const dBase = require('../database/dbConfig.js');
const test = require('supertest');
const server = require('../api/server.js');

describe('POST /register', () => {
    beforeEach(async() => {
        await dBase('users')
        .truncate();
    })

    it('Should register the member to the database', async () => {
        const newFather = await
        request(server).post('/api/auth/register')
        .send({username: 'Stygian', password: 'Just4Me!'})
        expect(newFather.body.username).toMatch(/Stygian/)
    })

    it('Should return a 201 status', async () => {
        const response = await
        request(server).post('/api/auth/register')
        .send({username: 'Stygian', password: 'Just4Me!'})
        expect(response.status).toBe(201)
    })
})

describe ('GET /', () => {
    beforeEach(async() => {
        await dBase('users')
        .truncate();
    })

    it('Should register the member to the database', async () => {
        const response = await
        request(server).get('/api/jokes')
        expect(response.status).toBe(201)
    })
})