const { app, initializeDbConnection, closeDbConnection } = require('../search.js');
const request = require('supertest');
const mysql = require('mysql');

beforeAll(done => {
    done();
});
  
afterAll(done => {
    done();
});

describe('GET /', () => {
    it('should return the index page with status 200 and HTML content', async () => {        
        initializeDbConnection();
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toMatch(/text\/html/);
        closeDbConnection();
    });
});

describe('Search Endpoint', () => {
    it('should return correct label. Entry exists in the database', async () => {
        initializeDbConnection();
        const response = await request(app).get('/search?entry=eggs')
        expect(response.status).toBe(200);
        expect(response.text).toBe('And bakey');
        closeDbConnection();
    });
    
    it('should return missing label, Entry does not exists in the database', async () => {
        initializeDbConnection();
        const response = await request(app).get('/search?entry=notInDB')
        expect(response.status).toBe(200);
        expect(response.text).toBe('Aucun résultat trouvé');
        closeDbConnection();
    });
});




