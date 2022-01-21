const controll = {}

//add venta in history of client

controll.addVenta = (req,res)=>{
    const {rut} = req.params.rut;//recibimos el rut del cliente para poder adjuntar su nueva venta
    const {data} = req.body; //aca recibimos la data de la nueva venta

    //buscamos al cliente
    

}


module.exports = controll