let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
let expect = chai.expect;
let {Message} = require('../models');
chai.use(chaiHttp);

let vistor_vendor = {

}

let customer_vendor = {

}


describe('/Messaging Endpoints', function(){

    it('POST /message Should create a new message session', (done)=>{
        chai.request(server)
        .post('/message')
        .send({})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('messages');
            res.body.messages.should.be.an('array');
            res.body.should.have.property('id');
            res.body.id.should.have
            res.body.id.should.be.length(64);
            done();
        })
    })

    it('POST /message/session Should append messages to the messages array', (done)=>{
        chai.request(server)
        .post('/message/')
        .send()
        .end((err, res) => {
            res.should.have.status(400);
            expect(res.body).to.be.null
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
            expect(res.body.token).be.lengthOf(151)
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
            expect(res.body).to.be.null
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
            expect(res.body).to.be.null
            done()
        })
    })

    it('GET /vendor should list all vendors ', (done)=>{
        chai.request(server)
        .get('/vendor')
        .end((err, res) => {
            res.should.have.status(200);
            expect(res.body).to.be.a('array');
            done()
        })
    })
})