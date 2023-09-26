const {pool} = require("../database");
const Prenda = require("../models/user");

function getStart(request, response)
{
    let respuesta = {error: true, codigo:200, mensaje: "Punto de inicio"}
    response.send(respuesta)
}


const login = async (request, response) =>
{
    try
    {
    const {email, password} = request.body
    console.log(request.body);
    let sql = "SELECT iduser, firstname, surname, location,email, photo FROM user WHERE email = ? AND password = ?"

    
    let [result] = await pool.execute(sql, [email, password]);
        if(result.length != 0){
    let respuesta = {error:false, codigo:200,
        mensaje:"Se logueado un usuario", dataUser:result[0]}
    response.send(respuesta);
 }
 else 
 {
    let respuesta = {error:true, codigo:400,
        mensaje:"algo ha salido mal", dataUser:result}
    response.send(respuesta);
 }

}
catch(error)
{
    console.log(error);
}
    }

module.exports = {getStart,login}