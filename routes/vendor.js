

const router = require('express').Router();
const Controller = require('../controllers/vendorController')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router.post('/login', Controller.login)
router.post('/', upload.single('picture'), Controller.register)
router.get('/', Controller.get)
router.get('/:vendor/customers', Controller.customers)

module.exports = router;