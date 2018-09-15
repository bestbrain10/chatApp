let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
let expect = chai.expect;
let {Message} = require('../models');
chai.use(chaiHttp);


let customer =  {
    "_id": "5b9bf33d9169c52fc059c848",
    "email": "livinus619@live.com",
    "password": "$2a$10$GHMcxFJ9Z6zzF93wAjGmVOJ71t3WCbEzx5zIzIjRhTtw6QAsfAEdi",
    "fullname": "Livinus",
    "timestamp": "2018-09-14T17:43:25.049Z",
    "__v": 0,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNWI5YmYzM2Q5MTY5YzUyZmMwNTljODQ4IiwiaWF0IjoxNTM2OTQ3MTkzfQ.STSbAKerChIdwv8qGfhu04e7RowO7b2a2tizsbFHE_w"
}

let vendor =  {
    "_id": "5b9bf3c87e78c52ec014e990",
    "email": "vendor619@live.com",
    "password": "$2a$10$cMyhk56L2iA91wivUzCXTOpBmOU/7j/SrLkyG5zRXIiSkBNa7CF3e",
    "fullname": "vilinux",
    "timestamp": "2018-09-14T17:45:44.677Z",
    "__v": 0,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNWI5YmYzYzg3ZTc4YzUyZWMwMTRlOTkwIiwiaWF0IjoxNTM2OTQ3MTQ1fQ.yM9q8saZzIGpunKBhm72agkR8lPwyru1tv2hbeWjNE4"
}


describe('/Messaging Endpoints', function(){
    before(function(done){
        done()
    })

    after(function(done){
        Message.deleteMany({
            $or : [
                {
                    'messages.sender_id' : vendor._id,
                    'messages.recipient_id' : customer._id
                },
                {
                    'messages.recipient_id' : vendor._id,
                    'messages.sender_id' : customer._id
                }
            ]
        }).then(data => done())
        .catch(err => {
            done()
        })
    })

    it('POST /message Should create a new message session for vendor and customer if JWT header is present', (done)=>{
        chai.request(server)
        .post('/message')
        .withCredentials({
            'Authentication' : `Bearer ${customer.token}`
        })
        .send({})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('messages');
            res.body.messages.should.be.an('array');
            res.body.should.have.property('id');
            res.body.id.should.be.length(64);
            done();
        })
    })

    it('POST /message Should create a new message session for vendor and visitor if no JWT header is present', (done)=>{
        chai.request(server)
        .post('/message')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('messages');
            res.body.messages.should.be.an('array');
            res.body.should.have.property('id');
            res.body.id.should.be.length(64);
            done();
        })
    })

    it('POST /message/session Should append messages to the messages array', (done)=>{
        chai.request(server)
        .post('/message')
        .send({
            sender : 'Customer',
            sender_id : customer._id,
            recipient : 'Vendor',
            recipient_id : vendor._id,
            info : 'Lorem ipsum dolor sit amet'
        })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.messages.should.have.length.greaterThan(1);
            done()
        })
    })

})