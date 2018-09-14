
const {Message} = require('../models');


module.exports = class messageController{
    static get(req, res, next){
        Message.find({session : req.params.session})
        .then(messages => {
            res.json(messages)
        }, next)
        .catch(next)
    }

    static init(req, res, next){
        Message.create({})
        .then(message => {
            res.json(message)
        }, next)
        .catch(next)
    }

    static create(req, res, next){
        Message.update({
            session : req.params.session
        },{
            $push : {messages : req.body}
        })
        .then(({nModified}) => {
            res.json(Boolean(nModified).valueOf())
        }, next)
        .catch(next)
    }
}
