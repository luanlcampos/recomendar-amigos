const request = require('supertest');

const app = require('../src/app');

/**
 * O teste a seguir é baseado na seguinte lista adjacente
 * Onde A = 1x11, B = 2x11, C = 3x11, D = 4x11, E = 5x11, para melhor leitura
 * {
 *    'A': [ 'B', 'C' ],
      'B': [ 'A', 'D' ],
      'C': [ 'A', 'D', 'E' ],
      'D': [ 'B', 'C' ],
      'E': [ 'C' ]
 * }
 */

beforeAll(async () => {
    const persons = [
        { "cpf": "11111111111", "name": "Joao" },
        { "cpf": "22222222222", "name": "Lucas" },
        { "cpf": "33333333333", "name": "Pablo" },
        { "cpf": "44444444444", "name": "Matheus" },
        { "cpf": "55555555555", "name": "Jorge" }
    ];

    const relationships = [
        { "cpf1": "11111111111", "cpf2": "22222222222" },
        { "cpf1": "11111111111", "cpf2": "33333333333" },
        { "cpf1": "22222222222", "cpf2": "44444444444" },
        { "cpf1": "33333333333", "cpf2": "44444444444" },
        { "cpf1": "33333333333", "cpf2": "55555555555" }
    ];

    for (const person of persons) {
        await request(app)
            .post('/v1/person')
            .set('Content-Type', 'application/json')
            .send(person);
    }

    for (const relationship of relationships) {
        await request(app)
            .post('/v1/relationship')
            .set('Content-Type', 'application/json')
            .send(relationship);
    }
});

describe('GET v1/recommendations/:CPF', () => {
    test('Teste A: deve retornar uma lista com cpfs sugeridos [D, E]', async () => {
        const res = await request(app)
            .get('/v1/recommendations/11111111111')

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('status', 'ok');
        expect(res.body).toHaveProperty('data');
        expect(res.body.data[0]).toBe('44444444444');
        expect(res.body.data[1]).toBe('55555555555');
    });

    test('Teste B: deve retornar uma lista com cpfs sugeridos [C]', async () => {
        const res = await request(app)
            .get('/v1/recommendations/22222222222')

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('status', 'ok');
        expect(res.body).toHaveProperty('data');
        expect(res.body.data[0]).toBe('33333333333');
    });

    test('Teste C: deve retornar uma lista com cpfs sugeridos [B]', async () => {
        const res = await request(app)
            .get('/v1/recommendations/33333333333')

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('status', 'ok');
        expect(res.body).toHaveProperty('data');
        expect(res.body.data[0]).toBe('22222222222');
    });

    test('Teste D: deve retornar uma lista com cpfs sugeridos [A, E]', async () => {
        const res = await request(app)
            .get('/v1/recommendations/44444444444')

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('status', 'ok');
        expect(res.body).toHaveProperty('data');
        expect(res.body.data[0]).toBe('11111111111');
        expect(res.body.data[1]).toBe('55555555555');
    });

    test('teste E: deve retornar uma lista com cpfs sugeridos [A, D]', async () => {
        const res = await request(app)
            .get('/v1/recommendations/55555555555')

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('status', 'ok');
        expect(res.body).toHaveProperty('data');
        // E é amigo do C
        expect(res.body.data[0]).toBe('11111111111');
        expect(res.body.data[1]).toBe('44444444444');
    });

    test('deve retornar erro: cpf inválido', async () => {
        const res = await request(app)
            .get('/v1/recommendations/1111111a111')

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('status', 'error');
        expect(res.body.error).toHaveProperty('message', 'CPF Inválido');
    });

    test('deve retornar erro: cpf não cadastrado', async () => {
        const res = await request(app)
            .get('/v1/recommendations/99999999999')

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('status', 'error');
        expect(res.body.error).toHaveProperty('message', 'Usuário não encontrado');
    });
});