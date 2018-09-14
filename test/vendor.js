let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
let expect = chai.expect;
let {Vendor} = require('../models');
chai.use(chaiHttp);

let user = {
    fullname : 'Livinus Igbaji Oga-ifu',
    password : 'password',
    email : 'livinus619@live.com',
    picture : '2.jpg'
}

describe('/vendor Endpoints', function(){
    before('delete test user if existing', function(done) {
        Vendor.deleteOne({email : user.email})
        .then(() => {
            done()
        })
        .catch(err => {
            done()
        })
    });
    
    after('delete test user after all test', function(done){
        Vendor.deleteOne({email : user.email})
        .then(() => {
            done();
        })
        .catch(err => {
            done()
        })
    })

    it('POST /vendor Should create a new record ', (done)=>{
        chai.request(server)
        .post('/vendor')
        .send(user)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('token');
            res.body.password.should.notEqual(user.password, )
            res.body.token.should.be.length(151)
            done();
        })
    })

    it('POST /vendor Should fail to create a new record with empty request body', (done)=>{
        chai.request(server)
        .post('/vendor')
        .send({})
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.null;
            done()
        })
    })

    it('POST /vendor/login Should login the user with correct email and password', (done)=>{
        chai.request(server)
        .post('/vendor/login')
        .send({
            email : 'livinus619@live.com',
            password : 'password'
        })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('token');
            res.body.token.should.be.length(151)
            done()
        })
    })

    it('POST /vendor/login Should fail to  login the user with wrong password', (done)=>{
        chai.request(server)
        .post('/vendor/login')
        .send({
            email : 'livinus619@live.com',
            password : 'aaa'
        })
        .end((err, res) => {
            res.should.have.status(400);
            res.body.token.should.be.null
            done()
        })
    })

    it('POST /vendor/login Should fail to  login the user with non existing email', (done)=>{
        chai.request(server)
        .post('/vendor/login')
        .send({
            email : 'livinus777@live.com',
            password : 'aaa'
        })
        .end((err, res) => {
            res.should.have.status(400);
            res.body.token.should.be.null
            done()
        })
    })

    it('GET /vendor should list all vendors ', (done)=>{
        chai.request(server)
        .get('/vendor')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.token.should.be.null;
            done()
        })
    })
})