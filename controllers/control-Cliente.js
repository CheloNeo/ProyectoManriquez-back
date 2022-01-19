let controller = {}

//modelo cliente
const Cliente = require('../models/Cliente');

controller.crearCliente = (req,res)=>{
    try {
        const cliente = new Cliente(req.body);
        cliente.save()
            .then((data)=>{
                res.json({status:200,mensaje:"cliente creado con exito!"});
            })
            .catch((err)=>{
                res.json({status:500,mensaje:"creacion fallida del cliente!"});
            })
    } catch (error) {
        res.json({status:500,mensaje:"creacion fallida del cliente!"});
    }
}


module.exports = controller;