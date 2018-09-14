
const {Vendor} = require('../models');


module.exports = class vendorController{
    static login(req, res, next){
        Vendor.login({email : req.body.email, password: req.body.password})
        .then(user => res.json(user), err => res.status(400).json(null))
        .catch(next)
    }

    static register(req, res, next){
        Vendor.register(req.body)
        .then(vendor => {
            res.json(vendor)
        }, next)
        .catch(next)
    }

    static get(req, res, next){
        Vendor.find({})
        .then(vendors => res.json(vendors), next)
        .catch(next)
    }
}