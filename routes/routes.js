const { Router } = require('express');
const router = Router();
let controller_User = require('../controllers/control-User');
let controller_Ventas = require('../controllers/control-Ventas');
let controller_Proveedor = require('../controllers/control-Proveedor');
let controller_Cliente = require('../controllers/control-Cliente');


//login
router.post('/new', controller_User.creacionUser);
router.post('/login', controller_User.login);
router.post('/validate', controller_User.validateToken);
router.delete('/delete/:rut',controller_User.deleteUsuario);

//ventas
router.post('/newGuiaDeVenta', controller_Ventas.crearVenta);
router.post('/newOrdenDeCompra',controller_Ventas.crearOrden);
router.get('/filtrarVenta/:id',controller_Ventas.filtrarVenta);
router.get('/verificarEstado/:id', controller_Ventas.verificarEstado);

//cliente

router.post('/createCliente', controller_Cliente.crearCliente);
router.post('/mensajeMasivo', controller_Cliente.mensajeMasivo);
router.get('/verClientes', controller_Cliente.verClientes);

//proveedor

router.post('/createProveedor',controller_Proveedor.crearProveedor);
router.post('/eliminarProveedor',controller_Proveedor.eliminarProveedor);
router.get('/listarProveedores',controller_Proveedor.ListarProveedores);



module.exports = router;