const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
const client = redis.createClient();

const msgCount = 0;

module.exports = class Controller{
    static get(req, res, next){
        client.getAsync().then(msgs => {
            res.json(JSON.parse(msgs))
        })
        .catch(next)
    }

    static create(req, res, next){
        client.setAsync(msgCount++, JSON.stringify(req.body))
        .then(msg => {
            res.json(msg)
        })
        .catch(next)
    }

    static update(req, res, next){
        client.set(req.params.msg, JSON.stringify(req.body))
        .then(msg => {
            res.json(msg)
        })
        .catch(next)
    }

    static delete(req, res, next){
        client.unlink(req.params.msg)
        .then(msg => res.json(msg))
        .catch(next)
    }

    static error(){
        
    }
}