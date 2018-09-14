

const router = require('express').Router();
const Controller = require('../controllers/vendorController')

router.post('/login', Controller.login)
router.post('/', Controller.register)
router.get('/', Controller.get)

module.exports = router;