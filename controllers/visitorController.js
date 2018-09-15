
const {Visitor} = require('../models');


module.exports = class vendorController{
    static login(req, res, next){
        Visitor.create({})
        .then(user => res.json(user), next)
        .catch(next)
    }
}