
const Model = require('../models');


module.exports = class vendorController{
    static login(req, res, next){
        Model.Vendor.login(req.body)
        .then(user => res.json(user), err => {
            console.log({err});
            res.status(400).json(null)
        })
        .catch(next)
    }

    static register(req, res, next){
        Model.Vendor.register(Object.assign(req.body, req.file && {picture : req.file.filename}))
        .then(vendor => {
            res.json(vendor)
        }, err => res.status(400).json(null))
        .catch(next)
    }

    static get(req, res, next){
        Model.Vendor.find({})
        .then(vendors => res.json(vendors), next)
        .catch(next)
    }

    static customers(req, res, next){
        //select last chat session foreach user that av chatted with vendor
        Model.Message.aggregate([
            {$match : {'messages.recipient' : 'Vendor', 'messages.recipient_id' : req.params.vendor}},
            {$unwind : '$messages'},
            {$group : {'messages' : {$addToSet : {sender : '$messages.sender', 'sender_id' : '$messages.sender_id'}}, _id : {$sum : 1}}},
            {$unwind : '$messages'},
            {$replaceRoot : {newRoot : '$messages'}},  
        ])
        .then(senders => {
            return Promise.all(senders.filter(({sender}) => sender != 'Vendor').map(({sender, sender_id}) => Model[sender].findOne({_id : sender_id})))
        })
        .then((senders) => res.json(senders), next)
        .catch(next)
    }
}