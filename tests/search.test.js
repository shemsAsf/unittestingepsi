const { app, initializeDbConnection } = require('../search.js');
const request = require('supertest');
const mysql = require('mysql');

jest.mock('mysql');

// Mock the createConnection method
const mockCreateConnection = {
    connect: jest.fn((callback) => callback(null)),
    query: jest.fn(),
    end: jest.fn()
};

let testEntry = [{ id: 1, entry: 'testError', label: 'failure' }, { id: 2, entry: 'test', label: 'success' }];

mysql.createConnection.mockReturnValue(mockCreateConnection);

describe('GET /', () => {
    beforeAll(() => {
        // Mock the database query response
        mockCreateConnection.query.mockImplementation((query, params, callback) => {
            callback(null, testEntry);
        });
        initializeDbConnection();
    });

    it('should return the index page with status 200 and HTML content', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toMatch(/text\/html/);
    });
});

describe('Search Endpoint', () => {
    it('should return correct label if entry exists in the database', async () => {
        const mockQueryCallback = jest.fn((query, params, callback) => {
            callback(null, testEntry);
        });

        const response = await request(app)
            .get('/search')
            .query({ entry: 'test' });

        expect(response.status).toBe(200);
        expect(response.text).toBe('success');
        expect(mockQueryCallback).toHaveBeenCalledWith(
            'SELECT label FROM entries WHERE entry = ?',
            ['test'],
            expect.any(Function)
        );
    });
});