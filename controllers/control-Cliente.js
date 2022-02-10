let controller = {}

let nodemailer = require('nodemailer');

//modelo cliente
const Cliente = require('../models/Cliente');

controller.crearCliente = (req, res) => {
    try {
        
        const cliente = new Cliente(req.body);
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
            apellidos: 1,
            direccion: 1,
            telefono: 1,
            correo: 1,
            rut: 1,
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

module.exports = controller;