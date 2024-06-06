const { app, initializeDbConnection } = require('../search.js');
const request = require('supertest');
const {calculateExpression} = require("../public/script.js")

beforeAll(done => {
    done();
});
  
afterAll(done => {
    done();
});

describe('Unit testing', () => {
    it('test expression evaluation', async () => {
        expect(calculateExpression("2")).toBe(2);
    });
    
    it('test operation priority', async () => {
        expect(calculateExpression("1+2*3+4")).toBe(11);
        expect(calculateExpression("(1+2)*3+4")).toBe(13);
        expect(calculateExpression("1+2*(3+4)")).toBe(15);
        expect(calculateExpression("(1+2)*(3+4)")).toBe(21);
    });
});
