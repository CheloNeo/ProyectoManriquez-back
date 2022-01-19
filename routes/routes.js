const { Router } = require('express');
const router = Router();
let controller_User = require('../controllers/control-User');

router.post('/new', controller_User.creacionUser);
router.post('/login', controller_User.login);
router.post('/validate', controller_User.validateToken);
router.delete('/delete/:rut',controller_User.deleteUsuario);

module.exports = router;