//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../models/user');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
describe('User', () => {
    beforeEach((done) => { //Before each test we empty the database
        User.deleteMany({}, (err) => {
           done();
        });
    });
  /*
  * Test the /POST route
  */
  describe('/POST User', () => {
      it('it should register the user', (done) => {
        var user = {
          fullName: 'Vivek Chaudhary',
          mobile_number: '9540298880',
          emailid: 'nice.vivek25@gmail.com',
          dob: '25-07-1989',
          password:'vivek@1989',
          image:'https://scontent.fdel19-1.fna.fbcdn.net/v/t1.0-1/c0.0.160.160a/p160x160/44576904_10210470890963543_3245882333785489408_n.jpg?_nc_cat=109&_nc_ht=scontent.fdel19-1.fna&oh=68c851a4fa6f28fdfef0923cffc01a20&oe=5CDBCA5C',
          isd_code:'+91',
          gender: 'M'
        }
        chai.request(server)
            .post('/api/register')
            .send(user)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('success');
              res.body.should.have.property('statusCode').eql(200);
              done();
            });
      });

      it('it should not register a user without fullName, mobile_number, emailid, dob, password, image, isd_code, gender fields', (done) => {
            var user = {};
            chai.request(server)
            .post('/api/register')
            .send(user)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('statusCode').eql(400);
              res.body.should.have.property('errors');
              res.body.errors.should.have.property('fullName');
              res.body.errors.should.have.property('mobile_number');
              res.body.errors.should.have.property('emailid');
              res.body.errors.should.have.property('dob');
              res.body.errors.should.have.property('password');
              res.body.errors.should.have.property('isd_code');
              res.body.errors.should.have.property('gender');
              done();
            });
      });
  });

});
