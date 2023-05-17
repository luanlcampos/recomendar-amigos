// tests/health.test.js

const request = require('supertest');

// Get our Express app object (we don't need the server part)
const app = require('../src/app');

describe('/ health check', () => {
    test('deve retornar HTTP 200', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
    });

    test('deve retornar status: ok na respota', async () => {
        const res = await request(app).get('/');
        expect(res.body.status).toEqual('ok');
    });
})