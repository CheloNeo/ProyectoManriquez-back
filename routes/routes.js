const { Router } = require('express');
const router = Router();
let controller = require('../controllers/control');

router.post('/new', controller.creacionUser);
router.post('/search', controller.login);


module.exports = router;