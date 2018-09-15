
const {Vendor} = require('../models');


module.exports = class vendorController{
    static login(req, res, next){
        Vendor.login(req.body)
        .then(user => res.json(user), err => {
            console.log(err);
            res.status(400).json(null)
        })
        .catch(next)
    }

    static register(req, res, next){
        Vendor.register(Object.assign(req.body, req.file && {picture : req.file.filename}))
        .then(vendor => {
            res.json(vendor)
        }, err => res.status(400).json(null))
        .catch(next)
    }

    static get(req, res, next){
        Vendor.find({})
        .then(vendors => res.json(vendors), next)
        .catch(next)
    }
}