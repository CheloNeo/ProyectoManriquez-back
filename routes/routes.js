const { Router } = require('express');
const router = Router();
let controller = require('../controllers/control');

router.post('/new', controller.creacionUser);

module.exports = router;