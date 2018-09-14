let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
let expect = chai.expect;
let { Customer }= require('../models');
chai.use(chaiHttp);

let user = {
    fullname : 'Livinus Igbaji Oga-ifu',
    password : 'password',
    email : 'livinus619@live.com',
    picture : '2.jpg'
}

describe('/customer Endpoints', function(){
    before('delete test user if existing', function(done) {
        Customer.deleteOne({email : user.email})
        .then(() => {
            done()
        })
        .catch(err => {
            done()
        })
    });
    
    after('delete test user after all test', function(done){
        Customer.deleteOne({email : user.email})
        .then(() => {
            done();
        })
        .catch(err => {
            done()
        })
    })

    it('POST /customer Should create a new record ', (done)=>{
        chai.request(server)
        .post('/customer')
        .send(user)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('token');
            expect(res.body.token).be.lengthOf(151)
            done();
        })
    })

    it('POST /customer Should fail to create a new record with empty request body', (done)=>{
        chai.request(server)
        .post('/customer')
        .send({})
        .end((err, res) => {
            res.should.have.status(400);
            expect(res.body).to.be.null
            done()
        })
    })

    it('POST /customer/login Should login the user with correct email and password', (done)=>{
        chai.request(server)
        .post('/customer/login')
        .send({
            email : 'livinus619@live.com',
            password : 'password'
        })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('token');
            expect(res.body.token).be.lengthOf(151)
            done()
        })
    })

    it('POST /customer/login Should fail to  login the user with wrong password', (done)=>{
        chai.request(server)
        .post('/customer/login')
        .send({
            email : 'livinus619@live.com',
            password : 'aaa'
        })
        .end((err, res) => {
            res.should.have.status(400);
            expect(res.body).to.be.null
            done()
        })
    })

    it('POST /customer/login Should fail to  login the user with non existing email', (done)=>{
        chai.request(server)
        .post('/customer/login')
        .send({
            email : 'livinus777@live.com',
            password : 'aaa'
        })
        .end((err, res) => {
            res.should.have.status(400);
            expect(res.body).to.be.null
            done()
        })
    })

    it('GET /customer should list all customers ', (done)=>{
        chai.request(server)
        .get('/customer')
        .end((err, res) => {
            res.should.have.status(200);
            expect(res.body).to.be.a('array');
            done()
        })
    })
})