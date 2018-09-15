let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
let expect = chai.expect;
let {Vendor} = require('../models');
chai.use(chaiHttp);


describe('/visitor endpoint testing', function(){
    it('/POST visitor/login should generate a new visitor with id as a 64bit random string', function(done){
        chai.request(server)
        .post('/visitor/login')
        .send({})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('id');
            res.body.id.should.be.length(64);
            done();
        })
    })
})