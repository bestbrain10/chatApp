
const {Customer} = require('../models');


module.exports = class vendorController{
    static login(req, res, next){
        Customer.login({email : req.body.email, password: req.body.password})
        .then(user => res.json(user), err => res.status(400).json(null))
        .catch(err => {
            console.log(err)
            next(err.toString())
        })
    }

    static register(req, res, next){
        Customer.register(req.body)
        .then(customer => {
            res.json(customer)
        }, next)
        .catch(next)
    }
}