
const Model = require('../models');


module.exports = class messageController{
    static get(req, res, next){
        Model.Message.find({id : req.params.session})
        .populate([{path : 'messages.sender_id'},{path : 'messages.recipient_id'}])
        .then(messages => {
            res.json(messages)
        }, next)
        .catch(next)
    }

    static init(req, res, next){
        Promise.all([
            req.body.asA.toLowerCase() != 'vendor' ? Model.Message.findOne({'messages.sender_id' : req.body.reciever}).sort({timestamp : -1}) : Model.Message.create({}),
            Model[req.body.asA].findOne({_id : req.body.reciever})
        ])
        .then(message => {
            res.json(message)
        }, next)
        .catch(next)
    }

    static create(req, res, next){
        Model.Message.update({
            id : req.params.session
        },{
            $push : {messages : req.body}
        })
        .then(({nModified}) => {
            res.json(Boolean(nModified).valueOf())
        }, next)
        .catch(next)
    }
}
