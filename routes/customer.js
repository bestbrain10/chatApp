

const router = require('express').Router();
const Controller = require('../controllers/customerController')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


router.post('/login', Controller.login)
router.post('/', upload.single('picture'), Controller.register)


module.exports = router;