const { Router } = require('express');
const router = Router();
let controller_User = require('../controllers/control-User');
let controller_Ventas = require('../controllers/control-Ventas');
let controller_Proveedor = require('../controllers/control-Proveedor');
let controller_Cliente = require('../controllers/control-Cliente');
let controller_tarea = require('../controllers/control-Tareas');
let controller_History = require('../controllers/control-History');
let controller_Product = require('../controllers/control-Productos')
let controller_categoria = require('../controllers/control-Categoria')
let controller_pendiente = require('../controllers/controller-Pendiente')
let controller_finanzas = require('../controllers/controll-finanzas')
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
router.get('/get/ventas',controller_Ventas.getVentaComponent)
router.get('/venta/get/list/product/:id',controller_Ventas.getProductForId)
router.post('/venta/delete/producto',controller_Ventas.deleteproducto) //modificacion de valores de cantidad
router.get('/get/ventas/for/client/:rut',controller_Ventas.getVentaCliente)
router.post('/modificar/estado',controller_Ventas.modificarEstado)
router.post('/delete/venta',controller_Ventas.deleteVenta)
router.post('/update/venta',controller_Ventas.actualizarVenta);

//cliente
router.post('/delete/cliente',controller_Cliente.eliminarCliente)
router.post('/createCliente', controller_Cliente.crearCliente);
router.post('/mensajeMasivo', controller_Cliente.mensajeMasivo);
router.get('/verClientes', controller_Cliente.verClientes);
router.get('/getCliente/estadistica',controller_Cliente.getCliente_Estadistica);
router.get('/search/cliente/:rut',controller_Cliente.searchCliente)
router.post('/get/venta/cliente/',controller_Cliente.searchClienteVentaUnica);
router.post('/calcular/total/Venta',controller_Cliente.calcularTotalVenta);
router.put('/update/Cliente/:id',controller_Cliente.modificarCliente);

//actualizar

router.post('/actualizar/carrito/Cliente',controller_Cliente.actualizarCarrito);


//proveedor
router.post('/createProveedor',controller_Proveedor.crearProveedor);
router.post('/eliminarProveedor',controller_Proveedor.eliminarProveedor);
router.get('/listarProveedores',controller_Proveedor.ListarProveedores);
router.put('/modificarProveedor/:id',controller_Proveedor.modificarProveedor);
router.get('/proveedor/:id',controller_Proveedor.buscarProveedor);

//producto
router.post('/newProduct', controller_Product.crearProducto);
router.post('/modifyProduct',controller_Product.modificarProducto);
router.get('/delete/:id',controller_Product.eliminarProducto);
router.get('/get/producto',controller_Product.getProductos);//general
router.post('/get/producto/category',controller_Product.getForCategory); //estadistica
router.get('/get/product/:id',controller_Product.getOneProduct); //estadistica
router.post('/modify/add/cantidad', controller_Product.addModifiProduct)
router.post('/modify/delete/cantidad',controller_Product.deleteModifiProduct)
router.post('/verify/cantidad',controller_Product.verifyStock)




//tareas
router.post('/crearTarea',controller_tarea.addTarea);
router.put('/modificarTarea/:id',controller_tarea.modifyTarea);
router.delete('/eliminarTarea/:id',controller_tarea.deleteTarea);

//history
router.post('/addVenta/:rut',controller_History.addVenta);
router.get('/getHistory/:rut',controller_History.traerHistoria);


//categorias
router.post('/add/categoria',controller_categoria.crearCategoria)
router.post('/modify/categoria/:id',controller_categoria.modificarCategoria)
router.get('/delete/categoria/:id',controller_categoria.eliminarCategoria)
router.get('/get/categoria',controller_categoria.getCategoria)
router.post('/modify/category',controller_categoria.modifyCategory)


//pendientes
router.post('/add/pendiente',controller_pendiente.addPendiente);
router.get('/get/pendiente',controller_pendiente.getPendiente);
router.get('/get/pendiente/:id',controller_pendiente.getPendienteForId);
router.post('/delete/anteriores',controller_pendiente.deleteAnteriores);
router.get('/delete/one/:id',controller_pendiente.deleteOne);
router.post('/modify/one',controller_pendiente.updateOne);


//finanzas
router.post('/add/venta/finanzas',controller_finanzas.addGanancia)
router.post('/deleteVenta/finanzas',controller_finanzas.removeGanancia)
router.post('/new/finanza',controller_finanzas.addFinanza)
router.post('/add/finanzas/gastos',controller_finanzas.addGasto)
router.get('/get/finanzas',controller_finanzas.getFinanzas)

//abono

router.post('/add/abono',controller_Ventas.addAbono)


module.exports = router;