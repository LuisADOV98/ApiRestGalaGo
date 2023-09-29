const {pool} = require("../database");
const Prenda = require("../models/prenda");

const getPrenda = async (request, response) =>
{
    try
    {
        let sql = "SELECT * FROM prenda order by idprenda desc limit 20";


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


const editarPrenda = async (request, response) => {
    try {
        console.log(request.body);
      let params = [request.body.title,
                    request.body.price,
                    request.body.description,
                    request.body.location,
                    request.body.state,
                    request.body.size,
                    request.body.event,
                    request.body.type,
                    request.body.photo1,
                    request.body.photo2,
                    request.body.photo3,
                    request.body.photo4,
                    request.body.idprenda]

        let sql = "UPDATE prenda SET title = COALESCE(?, title), " +
                                     "price = COALESCE(?, price), " +
                                     "description = COALESCE(?, description), " +
                                     "location = COALESCE(?, location), " +
                                     "state = COALESCE(?, state), " +
                                     "size = COALESCE(?, size), " +
                                     "event = COALESCE(?, event), " +
                                     "type = COALESCE(?, type), " +
                                     "photo1 = COALESCE(?, photo1), " +
                                     "photo2 = COALESCE(?, photo2), " +
                                     "photo3 = COALESCE(?, photo3), " +
                                     "photo4 = COALESCE(?, photo4) " +
                                     "WHERE idprenda = ?"
      // Consulta SQL para actualizar la información de la prenda
  
      // Ejecutar la consulta SQL
      let [result] = await pool.query(sql, params);
  
        console.log(result);
      if(result.affectedRows > 0){
      let respuesta = {error:false, codigo:200,
          mensaje:"Se ha editado la prenda", dataUser:result}
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
  };


  const obtenerDetallesPrenda = async (request, response) => {
    try {
        console.log(request.body);
      let params = [request.body.idprenda]

      // Consulta SQL para obtener detalles de la prenda por su ID
      let sql = 'SELECT * FROM prenda WHERE idprenda = ?';
  
      // Ejecuta la consulta con el ID de la prenda proporcionado
      let [result] = await pool.query(sql, params);
  
      // Verifica si se encontraron resultados
      if (result.length === 0) {
        let respuesta = { error: true, mensaje: 'Prenda no encontrada', dataUser:result };
        response.send(respuesta);
      } else {
  
      // La prenda fue encontrada, devuelve los detalles
      let respuesta =  { error: false, codigo: 200, mensaje: 'Detalles de la prenda', dataUser: result };
      response.send(respuesta);
    }
    } catch (err) {
      console.error('Error al obtener detalles de la prenda:', err);
      return { error: true, mensaje: 'Error al obtener detalles de la prenda' };
    }
  };















module.exports = {getPrenda, editarPrenda, obtenerDetallesPrenda}