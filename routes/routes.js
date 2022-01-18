const { Router } = require('express');
const router = Router();
let controller = require('../controllers/control');

router.post('/new', controller.creacionUser);
router.post('/login', controller.login);
router.post('/validate', controller.validateToken);
router.delete('/delete/:rut',controller.deleteUsuario);

module.exports = router;