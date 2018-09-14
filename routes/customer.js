

const router = require('express').Router();
const Controller = require('../controllers/customerController')

router.post('/login', Controller.login)
router.post('/', Controller.register)


module.exports = router;