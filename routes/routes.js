const { Router } = require('express');
const router = Router();
let controller_User = require('../controllers/control-User');

//login
router.post('/new', controller_User.creacionUser);
router.post('/login', controller_User.login);
router.post('/validate', controller_User.validateToken);
router.delete('/delete/:rut',controller_User.deleteUsuario);

//ventas
router.post('/newGuiaDeVenta', controller_User.creacionUser);
router.post('/newOrdenDeCompra', controller_User.creacionUser);
router.get('/filtrarVenta/:id', controller_User.creacionUser);
router.get('/verificarEstado/:id', controller_User.login);
module.exports = router;