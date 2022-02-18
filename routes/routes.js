const { Router } = require('express');
const router = Router();
let controller_User = require('../controllers/control-User');
let controller_Ventas = require('../controllers/control-Ventas');
let controller_Proveedor = require('../controllers/control-Proveedor');
let controller_Cliente = require('../controllers/control-Cliente');
let controller_tarea = require('../controllers/control-Tareas');
let controller_History = require('../controllers/control-History');
let controller_Product = require('../controllers/control-Productos');

//login
router.post('/new', controller_User.creacionUser);
router.post('/login', controller_User.login);
router.post('/validate', controller_User.validateToken);
router.delete('/delete/:rut',controller_User.deleteUsuario);
router.post('/sendMail',controller_User.sendMail);
router.post('/enviarCodigo',controller_User.sendCodigo);
router.post('/modifyPass',controller_User.modifyPass)

//ventas
router.post('/newGuiaDeVenta', controller_Ventas.crearVenta);
router.post('/newOrdenDeCompra',controller_Ventas.crearOrden);
router.get('/filtrarVenta/:id',controller_Ventas.filtrarVenta);
router.get('/verificarEstado/:id', controller_Ventas.verificarEstado);
router.get('/get/ventas/estadistica',controller_Ventas.getVenta);

//cliente
router.post('/createCliente', controller_Cliente.crearCliente);
router.post('/mensajeMasivo', controller_Cliente.mensajeMasivo);
router.get('/verClientes', controller_Cliente.verClientes);
router.get('/getCliente/estadistica',controller_Cliente.getCliente_Estadistica);
router.get('/search/cliente/:rut',controller_Cliente.searchCliente)

//proveedor
router.post('/createProveedor',controller_Proveedor.crearProveedor);
router.post('/eliminarProveedor',controller_Proveedor.eliminarProveedor);
router.get('/listarProveedores',controller_Proveedor.ListarProveedores);
router.put('/modificarProveedor/:id',controller_Proveedor.modificarProveedor);

//producto
router.post('/newProduct', controller_Product.crearProducto);
router.post('/modifyProduct',controller_Product.modificarProducto);
router.delete('/delete/:id',controller_Product.eliminarProducto);

//tareas
router.post('/crearTarea',controller_tarea.addTarea);
router.put('/modificarTarea/:id',controller_tarea.modifyTarea);
router.delete('/eliminarTarea/:id',controller_tarea.deleteTarea);

//history
router.post('/addVenta/:rut',controller_History.addVenta);
router.get('/getHistory/:rut',controller_History.traerHistoria);

module.exports = router;