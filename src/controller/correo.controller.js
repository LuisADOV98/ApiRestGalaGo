const {request, response} = require("express");
const nodeMailer = require("nodemailer")

const enviarMensaje = async (req= request,resp=response)=>{
    let body = req.body;

    let config = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port:587,
        auth:{
            user:"galago606@gmail.com",
            pass:"qzly lsnm wcrb ebwk"
        }
    })
    const opciones ={
        from: body.email,
        to: "galago606@gmail.com",
        subject: body.firstname,
        text:body.mensaje
    }
    let co = await config.sendMail(opciones)
    console.log(co);
}

module.exports = {enviarMensaje}