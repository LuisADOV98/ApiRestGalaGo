const {pool} = require("../database");
const Prenda = require("../models/user");

function getStart(request, response)
{
    let respuesta = {error: true, codigo:200, mensaje: "Punto de inicio"}
    response.send(respuesta)
}

// Logearse (post)
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


// Registrar un usuario (post)
const register = async (req, res) => {
    try{
        let sql = "INSERT INTO user (firstname, surname, location, email, password, photo)" +
                  "VALUES ('" + req.body.firstname + "','" +
                                req.body.surname + "','" +
                                req.body.location + "','" +
                                req.body.email + "','" + 
                                req.body.password + "','" +
                                req.body.photo + "')";

        let [result] = await pool.query(sql);
        respuesta = {error: false, codigo: 200, dataUser: result}
        res.send(respuesta);
    }catch(err){
        console.log(err);
    }
}

    // const editarPerfil = async (request, response) => {
    //     try {
    //       const {iduser, firstname, surname, location, email, password, photo } = request.body;
    
      
    //       // Consulta SQL para actualizar la información del usuario
    //       const sql = `UPDATE user SET firstname = ?, surname = ?, location = ?, email = ?, password = ?,  photo = ? WHERE iduser = ?`;
    //       const params = [firstname, surname, location, email, password, photo, iduser];
      
    //       // Ejecutar la consulta SQL
    //       const [result] = await pool.query(sql, params);
      
    //       if (result) {
    //         return { error: false, codigo: 200, mensaje: 'Usuario actualizado con éxito.' };
    //       } else {
    //         return { error: true, codigo: 404, mensaje: 'Usuario no encontrado' };
    //       }
    //     } catch (error) {
    //       console.error('Error al actualizar el usuario:', error);
    //       throw error;
    //     }
    //   };

    //Editar perfil (put)
    const editarPerfil = async (request, response) => {
        try {
            console.log(request.body);
          let params = [request.body.firstname,
            request.body.surname,
            request.body.location,
            request.body.email,
            request.body.password,
            request.body.photo,
            request.body.iduser]

            let sql = "UPDATE user SET firstname = COALESCE(?, firstname), " +
                                         "surname = COALESCE(?, surname), " +
                                         "location = COALESCE(?, location), " +
                                         "email = COALESCE(?, email), " +
                                         "password = COALESCE(?, password), " +
                                         "photo = COALESCE(?, photo) " +
                                         "WHERE iduser = ?"
          // Consulta SQL para actualizar la información del usuario
      
          // Ejecutar la consulta SQL
          let [result] = await pool.query(sql, params);
      
            console.log(result);
          if(result.affectedRows > 0){
          let respuesta = {error:false, codigo:200,
              mensaje:"Se ha editado el perfil", dataUser:result}
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

module.exports = {getStart,login,register, editarPerfil}