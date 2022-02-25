let controller = {}

const e = require('express');
let nodemailer = require('nodemailer');

//modelo cliente
const Cliente = require('../models/Cliente');
const Ventas = require('../models/Ventas');

controller.crearCliente = async (req, res) => {
    try {
        const cliente = await new Cliente(req.body);
        cliente.save()
            .then((data) => {
                res.json({ status: 200, mensaje: "cliente creado con exito!" });
            })
            .catch((err) => {
                res.json({ status: 500, mensaje: "creacion fallida del cliente!" });
            })
    } catch (error) {
        res.json({ status: 500, mensaje: "creacion fallida del cliente!" });
    }
}

controller.mensajeMasivo = async (req, res) => {

    const { asunto, mensaje } = req.body;

    try {

        //primero traemos los correos de los clientes de nuestro sistema
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'maemguitarra@gmail.com', // usuario de correo
                pass: 'snshioiwejtyenwq', // clave de acceso a gmail
            },
        });

        let info = await transporter.sendMail({
            from: '"Pisos Manriquez " <maemguitarra@gmail.com>', // sender address
            to: ['juan.larenas@alumnos.uv.cl', 'marcelo.estay@alumnos.uv.cl'], // list of receivers
            subject: `${asunto}`, // Subject line
            text: "", // plain text body
            html: `${mensaje}` // html body
        });
        res.json({ status: 200, mensaje: "mensaje enviado con exito!" })
    } catch (error) {
        res.json({ status: 500, mensaje: "el mensaje tuvo fallas al momento de enviar intente mas tarde!" })
    }
}
controller.verClientes = async (req, res) => {
    //se le solicita a mongo todos los clientes
    //mongo responde y la respuesta lleva estado y array de clientes
    try {
        const clientes = await Cliente.find({},{
            nombre: 1,
            direccion: 1,
            telefono: 1,
            correo: 1,
            rut: 1,
            totalDeCompra:1,
        });
        // console.log(clientes);
        res.json({status:200,clientes: clientes});
    } catch (error) {
        console.log(error);
        res.json({
            status:500,
            mensaje: "Hable con el administrador"
        })

    }
}

controller.getCliente_Estadistica = async (req,res)=>{
    try {
        await Cliente.find({},{
            _id:0,
            nombre:1,
            totalDeCompra:1
        }).then((data)=>{ res.json({status:200,clientes: data});})
    } catch (error) {
        console.log(error)
    }
}


controller.searchCliente = async(req,res)=>{
    const rut = req.params.rut
    try {
        await Cliente.findOne({rut})
        .then((data)=>{
            if(data==null){
                res.json({
                    status:400,
                    data:data
                })
            }
            else{
                res.json({
                    status:200,
                    data:data
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
}

controller.searchClienteVentaUnica = async (req,res)=>{
    const { data , rut }  = req.body;
    if(rut=='' || data === ''){
        res.json({status:404,mensaje:"usuario no encontrado!"});
    }
    else{
        try {
            await Cliente.findOne({rut},{nombre:1,direccion:1,telefono:1,correo:1,rut:1})
            .then((data1)=>{
                var cliente = data1
                
                Ventas.findById(data,{})
                .then((dataVenta)=>{
                   if(dataVenta!=null){
                        res.json({status:200,data:cliente,dataVenta})
                   }
                })
                .catch((err)=>{
                    res.json({status:404,mensaje:"usuario no encontrado!"});
                })
            })
            .catch((err)=>{
                res.json({status:404,mensaje:"usuario no encontrado!"});
            })

        } catch (error) {
            
        }
    }
}


controller.actualizarCarrito = async (req,res)=>{
    const {idVenta,rut} = req.body;
    // idVenta es el id de la venta que hay que busar en el historial del rut
    // rut persona a la que se le va a modificar su historial
    // aux es igual a la data que se reemplazara

    await Ventas.findById(idVenta)
    .then((venta)=>{
        Cliente.findOne({rut})
        .then((cliente)=>{
            var aux = cliente.historial
            //recorremos el historial para buscar la venta
            aux.forEach(ventaEnHistorial => {
                //buscar la venta que es igual a la de nosotros y sacar el indice
                if(ventaEnHistorial._id == idVenta){
                    var index = aux.indexOf(ventaEnHistorial)
                    aux[index] = venta
                    Cliente.findOneAndUpdate({rut},{$set:{historial:aux}})
                    .then(()=>{
                        res.json({status:200,mensaje:"Envio listo"})
                    })
                    .catch((err)=>{
                        res.json({status:500,mensaje:"Envio fallido por modificacion"})
                    })
                }
            });
        })
        .catch((err)=>{
            res.json({status:500,mensaje:"Envio fallido por user"})
        })
    })
    .catch((err)=>{
        res.json({status:500,mensaje:"Envio fallido por venta"})
    })

}


controller.eliminarCliente = async (req,res)=>{
    const {rut}=req.body;
    

    await Ventas.deleteMany({rut}) //borramos todas las ventas relacionadas
    .then((data)=>{
        Cliente.findOneAndDelete({rut}) //borramos el cliente relacionado
        .then(()=>{
            res.json({status:200,mensaje:"eliminado exitosamente"})
        })
        .catch((err)=>{
            res.json({status:500,mensaje:"no fue eliminado!"})
        })
    })
    .catch((err)=>{
        res.json({status:500,mensaje:"no fue eliminado!"})
    })

}


module.exports = controller;