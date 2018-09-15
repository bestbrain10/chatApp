
const {Customer} = require('../models');


module.exports = class vendorController{
    static login(req, res, next){
        Customer.login(req.body)
        .then(user => res.json(user), err => res.status(400).json(null))
        .catch(err => {
            console.log(err)
            next(err.toString())
        })
    }

    static register(req, res, next){
        Customer.register(Object.assign(req.body, req.file && {picture : req.file.filename}))
        .then(customer => {
            res.json(customer)
        }, next)
        .catch(next)
    }
}