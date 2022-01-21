const Cliente = require("../models/Cliente");

const controll = {}

//add venta in history of client

controll.addVenta = (req,res)=>{
    const {rut} = req.params.rut;//recibimos el rut del cliente para poder adjuntar su nueva venta
    const {data} = req.body; //aca recibimos la data de la nueva venta

    //buscamos al cliente
    

}

controll.traerHistoria = async(req, res)=>{
    const rut = req.params.rut;
    try {
        const cliente = await Cliente.findOne({rut},
            {historial: 1});
        res.json({
            status:200,
            cliente: cliente
        });
    } catch (error) {
        console.log(error)
        res.json({
            status: 500,
            mensaje: "Hable con el administrador"
        })
    }
}

module.exports = controll