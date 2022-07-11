const chai = require('chai');
let assert = chai.assert;
const server = require('../server');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(5000);
  suite('Server Conversion Tests', function() {
    test('#1 Test GET /api/convert with valid input 10L', function(done){
      const input = "10L";
      //const calculatedOutput = convertHandler.getObjectWithAllValues(input);
      const expectedOutput = {
        initNum: 10,
        initUnit: 'L',
        returnNum: 2.64172,
        returnUnit: 'gal',
        string: '10 liters converts to 2.64172 gallons'
      };
      
      chai
        .request(server)
        .get("/api/convert?input=" + input)
        .end(function(err, res) {
          if(err) return console.error(err);
          assert.equal(res.status, 200);
          assert.equal(res.text, JSON.stringify(expectedOutput));
          done();
        });
    });
  
    test('#2 Test GET /api/convert with invalid input 32g', function(done){
      const input = "32g";
      const expectedOutput = "invalid unit";
      chai
        .request(server)
        .get("/api/convert?input=" + input)
        .end(function(err, res) {
          if(err) return console.error(err);
          assert.equal(res.status, 200);
          assert.equal(res.text, expectedOutput);
          done();
        })
    });
  
    test('#3 Test GET /api/convert with invalid input 3/7.2/4kg', function(done){
      const input = "3/7.2/4kg";
      const expectedOutput = "invalid number";
      chai
        .request(server)
        .get("/api/convert?input=" + input)
        .end(function(err, res) {
          if(err) return console.error(err);
          assert.equal(res.status, 200);
          assert.equal(res.text, expectedOutput);
          done();
        });
    });
  
    test('#4 Test GET /api/convert with invalid input 3/7.2/4kilomegagram', function(done){
      const input = "3/7.2/4kilomegagram";
      const expectedOutput = "invalid number and unit";
      chai
        .request(server)
        .get("/api/convert?input=" + input)
        .end(function(err, res) {
          if(err) return console.error(err);
          assert.equal(res.status, 200);
          assert.equal(res.text, expectedOutput);
          done();
        });
    });

    test("#5 Test GET /api/convert with valid input kg (with no number)", function(done){
      const input = "kg";
      const expectedOutput = {
        initNum: 1,
        initUnit: 'kg',
        returnNum: 2.20462,
        returnUnit: 'lbs',
        string: '1 kilograms converts to 2.20462 pounds'
      };
      chai
        .request(server)
        .get("/api/convert?input=" + input)
        .end(function(err, res) {
          if(err) return console.error(err);
          assert.equal(res.status, 200);
          assert.equal(res.text, JSON.stringify(expectedOutput));
          done();
        })
    })
  });

  /*Convert a valid input such as 10L: GET request to /api/convert.
    Convert an invalid input such as 32g: GET request to /api/convert.
    Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.
    Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.
    Convert with no number such as kg: GET request to /api/convert.*/
});
