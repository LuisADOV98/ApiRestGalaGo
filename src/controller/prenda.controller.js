const {pool} = require("../database");
const Prenda = require("../models/prenda");

const getPrenda = async (request, response) =>
{
    try
    {
        let sql = "SELECT * FROM prenda order by idprenda desc limit 4 ;";


        let [result] = await pool.query(sql);
        let respuesta = {error:false, codigo:200,
            mensaje:"estos son las prendas", data:result}
        response.send(respuesta);
    }
    catch(err)
    {
        console.log(err);
    }
}


module.exports = {getPrenda}