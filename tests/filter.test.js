const request = require('supertest');
const db = require('../src/db-connect');
const app = require('../src/app');
const config = require('../config');
const Logger = require('../src/logger').TestLogger;

describe("POST /search", () => {
    let server;
    beforeAll(async () => {
        await db.connect(config.mongoURL, Logger);
        server = await app(Logger);
    });

    describe("when appropriate values are passed into request", () => {
        test('Happy scenario', async () => {
            let minCount = 2700, maxCount = 3000;
            const response = await request(server)
                .post('/search')
                .send({ 
                    "startDate" : "2016-01-01", 
                    "endDate": "2020-02-02", 
                    "minCount": minCount, 
                    "maxCount" : maxCount
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200);
            expect(response.body.code).toEqual(0);
            let recordsCount = response.body.records && response.body.records.length 
                                ? response.body.records.length : 0;
            expect(recordsCount > 1).toBeTruthy();
            // If records are sorted already
            expect(response.body.records[0].totalCount > minCount).toBeTruthy();
            expect(response.body.records[recordsCount - 1].totalCount < maxCount).toBeTruthy();
        });
        test('Happy scenario but no records', async () => {
            const response = await request(server)
                .post('/search')
                .send({ 
                    "startDate" : "2022-01-01", 
                    "endDate": "2022-02-02", 
                    "minCount": 2700, 
                    "maxCount" : 3000
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200);
            expect(response.body.code).toEqual(0);
            expect(response.body.records.length == 0).toBeTruthy();
        });
    });

    describe("when the request is sent with wrong values", () => {
        test('Wrong startDate format', async () => {
            const response = await request(server)
                .post('/search')
                .send({ 
                    "startDate" : "2016-01-010", 
                    "endDate": "2020-02-02", 
                    "minCount": 2704, 
                    "maxCount" : 3000
                })
                .expect('Content-Type', /json/)
                .expect(422);
            expect(response.body.code).toEqual(1);
            let errors = response.body.errors;
            expect(errors.length).toEqual(1);
            expect(errors[0].field).toEqual('startDate');
        });
        test('Wrong endDate format', async () => {
            const response = await request(server)
                .post('/search')
                .send({ 
                    "startDate" : "2016-01-01", 
                    "endDate": "2020-002-02", 
                    "minCount": 2704, 
                    "maxCount" : 3000
                })
                .expect('Content-Type', /json/)
                .expect(422);
            expect(response.body.code).toEqual(1);
            let errors = response.body.errors;
            expect(errors.length).toEqual(1);
            expect(errors[0].field).toEqual('endDate');
        });
        test('Wrong startDate and endDate format', async () => {
            const response = await request(server)
                .post('/search')
                .send({ 
                    "startDate" : "20168-01-01", 
                    "endDate": "2020-002-02", 
                    "minCount": 2704, 
                    "maxCount" : 3000
                })
                .expect('Content-Type', /json/)
                .expect(422);
            expect(response.body.code).toEqual(1);
            let errors = response.body.errors;
            expect(errors.length).toEqual(2);
            expect(errors[0].field).toEqual('startDate');
            expect(errors[1].field).toEqual('endDate');
        });
        test('startDate is greater than endDate', async () => {
            const response = await request(server)
                .post('/search')
                .send({ 
                    "startDate" : "2021-10-01", 
                    "endDate": "2021-02-02", 
                    "minCount": 2704, 
                    "maxCount" : 3000
                })
                .expect('Content-Type', /json/)
                .expect(422);
            expect(response.body.code).toEqual(1);
            let errors = response.body.errors;
            expect(errors.length).toEqual(1);
            expect(errors[0].field).toEqual('endDate');
        });
        test('minCount and maxCount must be greater than 0', async () => {
            const response = await request(server)
                .post('/search')
                .send({ 
                    "startDate" : "2016-01-01", 
                    "endDate": "2020-02-02", 
                    "minCount": 0, 
                    "maxCount" : 0
                })
                .expect('Content-Type', /json/)
                .expect(422);
            expect(response.body.code).toEqual(1);
            let errors = response.body.errors;
            expect(errors.length).toEqual(2);
            expect(errors[0].field).toEqual('minCount');
            expect(errors[1].field).toEqual('maxCount');
        });
        test('All wrong request data must be validated', async () => {
            const response = await request(server)
                .post('/search')
                .send({ 
                    "startDate" : "2016-01-010", 
                    "endDate": "20201-02-02", 
                    "minCount": 0, 
                    "maxCount" : 0
                })
                .expect('Content-Type', /json/)
                .expect(422);
            expect(response.body.code).toEqual(1);
            let errors = response.body.errors;
            expect(errors.length).toEqual(4);
            expect(errors[0].field).toEqual('startDate');
            expect(errors[1].field).toEqual('endDate');
            expect(errors[2].field).toEqual('minCount');
            expect(errors[3].field).toEqual('maxCount');
        });
    });

    afterAll((done) => {
        db.close();
        done();
    });
})