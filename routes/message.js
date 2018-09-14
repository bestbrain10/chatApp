
const router = require('express').Router()
const Controller = require('../controllers/messageController');

router.post('/', Controller.init)
    

router.route('/:session')
    .post(Controller.create)
    .get(Controller.get)

module.exports = router;