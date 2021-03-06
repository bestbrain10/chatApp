

const mongoose =  require('mongoose');
const {Schema} = mongoose; 
const crypto = require('crypto');
const bcrypt = require("bcrypt-nodejs")
const jwt = require('jsonwebtoken')
const secret = '@@s3kr3!t.';

const passwordPreSave = function(next){
    if(this.isModified('password')){
        bcrypt.hash(this.password,null,null,(err,hash) => {
            if(err) return next(err)
            this.password = hash;
            next()
        })
    }else{
        next();
    }
}

const idPreSave = function(next){
    if(this.isNew){
        crypto.randomBytes(32, (err, buf) => {
           if(err) return next(err)
            this.id = buf.toString('hex');
            next();
        });

    }else{
        next();
    }
}

class userClass {
    static login({email, password}){
        return new Promise((resolve, reject) => {
            this.findOne({email})
            .select('+password')
            .then(user => {
                if(!user || (user && !user.comparePassword(password))) return reject(null);
                delete user.password;
                return resolve(Object.assign(user._doc, {token : jwt.sign({user : user._id}, secret)}));
            }, reject)
            .catch(reject)  
        })

    }

    static register(signup){
        console.log({signup})
        return new Promise((resolve, reject) => {
            this.create(signup)
            .then(user => {
                delete user.password;
                return resolve(Object.assign(user._doc, {token : jwt.sign({user : user._id}, secret)}));
            }, err => {
                console.log(err)
                reject(err)
            })
            .catch(err => {
                console.log(err)
                return reject(err)
            })  
        })
    }

    comparePassword(password){

        let $s = bcrypt.compareSync(password, this.password)
        console.log($s, password);
        return $s
    }
}

const customerSchema = new Schema({
    fullname : {type: String, required: true}, 
    email : {type: String, unique: true, required : true},
    password: {type: String, select : false},
    socket : [String],
    picture: {type: String},
    timestamp : {type: Date, 'default' : Date.now}
})
customerSchema.pre('save', passwordPreSave);
customerSchema.loadClass(userClass)


exports.Customer = mongoose.model('Customer', customerSchema);

const vendorSchema = new Schema({
    fullname : {type: String, required: true}, 
    email : {type: String, unique: true, required : true},
    password: {type: String, select : false},
    socket : [String],
    picture: {type: String},
    timestamp : {type: Date, 'default' : Date.now}
})

vendorSchema.pre('save', passwordPreSave);
vendorSchema.loadClass(userClass)
exports.Vendor = mongoose.model('Vendor', vendorSchema);


const visitorSchema = new Schema({
    id : String,
    socket : [String],
    timestamp : {type: Date, 'default' : Date.now}
})

visitorSchema.pre('save', idPreSave);
exports.Visitor = mongoose.model('Visitor', visitorSchema);

const messageSchema = new Schema({
    id : String,
    messages : [{
        sender : {type: String, enum: ['vendor','customer','visitor']},
        sender_id : {type: String, refPath : 'messages.sender'},
        recipient : {type: String, enum: ['vendor','customer','visitor']},
        recipient_id : {type: String, refPath: 'messages.recipient'},
        info : {type: String},
        timestamp : {type: Date, 'default' : Date.now}
    }],
    timestamp : {type: Date, 'default' : Date.now}
})

messageSchema.pre('save', idPreSave);
exports.Message = mongoose.model('Message', messageSchema);

module.exports = exports;
