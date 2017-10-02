let request = require('supertest');
let sinon = require('sinon')
let app = require('../index');
let socrata = require('../src/socrata');
let expect = require('chai').expect;
let assert = require('chai').assert;

let sandbox;

describe ('API Routes', function() {

  beforeEach(()=>{ sandbox = sinon.sandbox.create(); }) 
  afterEach(()=>{ sandbox.restore(); })

  describe('GET /api/titles', function() {

    it ('should respond with 404', function(done) {
      let socrataStub = sandbox.stub(socrata, 'getTitles') 
      socrataStub.resolves({ data: 'ok' })
      request(app)
        .get('/api/titles')
        .expect(404, done);
    })
    
    it ('should respond with 200', function(done) {
      let socrataStub = sandbox.stub(socrata, 'getTitles') 
      socrataStub.resolves({ data: 'ok' })
      request(app)
        .get('/api/titles')
        .expect(200, done);
    })
  })


  describe('GET /movie', function() {

    it ('should respond with 404', function(done) {
      request(app)
        .get('/api/movie')
        .expect(404, done);
    })

    it ('should append coordinates property to locations', function(done) {
      this.timeout(5000);
      let data = [ 
        { locations: 'Castagnola\'s Restaurant (Fisherman\'s Wharf)' },
        { locations: 'Golden Gate Bridge' },
        { locations: 'Sheraton Palace Hotel (639 Market Street)' }]

      let socrataStub = sandbox.stub(socrata, 'getTitles') 
      socrataStub.resolves({ data })

      request(app)
        .get('/api/movie?title=Herbie Rides Again')
        .expect(200)
        .end((err, resp)=>{
          let data = JSON.parse(resp.text);
          data.forEach((item)=>{
            assert.property(item, 'coordinates');
          })
          done();
        })
    })
  })
})
