const { Router } = require('express');
const router = Router();
let controller_User = require('../controllers/control-User');
let controller_Ventas = require('../controllers/control-Ventas');
let controller_Productos = require('../controllers/control-Productos');
let controller_Categoria = require('../controllers/control-Categoria');


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

//productos
router.post('/newProducto', controller_Productos.crearProducto);
router.put('/modificarProducto/:id', controller_Productos.modificarProducto);
router.delete('/eliminarProducto/:id', controller_Productos.eliminarProducto);

//categorias
router.post('/newCategoria', controller_Categoria.crearCategoria);
router.put('/modificarCategoria/:id',  controller_Categoria.modificarCategoria);
router.delete('/eliminarCategoria/:id', controller_Categoria.eliminarCategoria);
module.exports = router;