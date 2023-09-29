const { pool } = require("../database");
const Prenda = require("../models/prenda");

//Muestra las 20 ultimas prendas de la BBDD
const getPrenda = async (request, response) =>
{
    try
    {
        let sql = "SELECT * FROM prenda order by idprenda desc limit 20";

        let [result] = await pool.query(sql);
        let respuesta = {
            error: false, codigo: 200,
            mensaje: "estos son los titulos", data: result
        }
        response.send(respuesta);
    }
    catch (err) {
        console.log(err);
    }
}

const getPrendaHome = async (request, response) =>
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

// ARRAYS DE ENUMS PARA FILTROS 
const getTipo = async(req, res) => {
    try{
        let sql = "SELECT COLUMN_TYPE " +
                  "FROM information_schema.COLUMNS " +
                  "WHERE TABLE_SCHEMA = 'GalaGo' " +
                  "AND TABLE_NAME = 'prenda' " +
                  "AND COLUMN_NAME = 'tipo' "

        let [result] = await pool.query(sql);
        //Cojo sólo lo que esté entre comillas y coma para dejar un array de las opciones
            //COLUMN_TYPE es para acceder a los datos del enum
            //g define las barras /.../
            //despues de coger las coincidencias .map devuelve los valores eliminando (slice) los caracteres 
        let enumOptions = result[0].COLUMN_TYPE.match(/'([^']+)'/g).map(option => option.slice(1,-1));
        //Devuelve un dataEnum porque es un array de string en la respuesta de Angular 
        respuesta = {error: false, codigo: 200, dataEnum: enumOptions}
        res.send(respuesta);
    }catch(err){
        console.log(err);
    }
}
const getTalla = async(req, res) => {
    try{
        let sql = "SELECT COLUMN_TYPE " +
                  "FROM information_schema.COLUMNS " +
                  "WHERE TABLE_SCHEMA = 'GalaGo' " +
                  "AND TABLE_NAME = 'prenda' " +
                  "AND COLUMN_NAME = 'size' "

        let [result] = await pool.query(sql);
        //Cojo sólo lo que esté entre comillas y coma para dejar un array de las opciones
            //COLUMN_TYPE es para acceder a los datos del enum
            //g define las barras /.../
            //despues de coger las coincidencias .map devuelve los valores eliminando (slice) los caracteres 
        let enumOptions = result[0].COLUMN_TYPE.match(/'([^']+)'/g).map(option => option.slice(1,-1));
        //Devuelve un dataEnum porque es un array de string en la respuesta de Angular 
        respuesta = {error: false, codigo: 200, dataEnum: enumOptions}
        res.send(respuesta);
    }catch(err){
        console.log(err);
    }
}
const getEvento = async(req, res) => {
    try{
        let sql = `SELECT COLUMN_TYPE 
        FROM information_schema.COLUMNS 
        WHERE TABLE_SCHEMA = 'GalaGo' 
        AND TABLE_NAME = 'prenda' 
        AND COLUMN_NAME = 'evento'`

        let [result] = await pool.query(sql);
        //Cojo sólo lo que esté entre comillas y coma para dejar un array de las opciones
            //COLUMN_TYPE es para acceder a los datos del enum
            //g define las barras /.../
            //despues de coger las coincidencias .map devuelve los valores eliminando (slice) los caracteres 
        let enumOptions = result[0].COLUMN_TYPE.match(/'([^']+)'/g).map(option => option.slice(1,-1));
        //Devuelve un dataEnum porque es un array de string en la respuesta de Angular 
        respuesta = {error: false, codigo: 200, dataEnum: enumOptions}
        res.send(respuesta);
    }catch(err){
        console.log(err);
    }
}
const getEstado = async(req, res) => {
    try{
        let sql = "SELECT COLUMN_TYPE " +
                  "FROM information_schema.COLUMNS " +
                  "WHERE TABLE_SCHEMA = 'GalaGo' " +
                  "AND TABLE_NAME = 'prenda' " +
                  "AND COLUMN_NAME = 'state' "

        let [result] = await pool.query(sql);
        //Cojo sólo lo que esté entre comillas y coma para dejar un array de las opciones
            //COLUMN_TYPE es para acceder a los datos del enum
            //g define las barras /.../
            //despues de coger las coincidencias .map devuelve los valores eliminando (slice) los caracteres 
        let enumOptions = result[0].COLUMN_TYPE.match(/'([^']+)'/g).map(option => option.slice(1,-1));
        //Devuelve un dataEnum porque es un array de string en la respuesta de Angular 
        respuesta = {error: false, codigo: 200, dataEnum: enumOptions}
        res.send(respuesta);
    }catch(err){
        console.log(err);
    }
}
//Edita una prenda por idprenda y iduser
const editarPrenda = async (request, response) => {
    try {
        console.log(request.body);
        let params = [request.body.title,
        request.body.price,
        request.body.description,
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
            "state = COALESCE(?, state), " +
            "size = COALESCE(?, size), " +
            "evento = COALESCE(?, evento), " +
            "tipo = COALESCE(?, tipo), " +
            "photo1 = COALESCE(?, photo1), " +
            "photo2 = COALESCE(?, photo2), " +
            "photo3 = COALESCE(?, photo3), " +
            "photo4 = COALESCE(?, photo4) " +
            "WHERE idprenda = ?"
        // Consulta SQL para actualizar la información de la prenda

        // Ejecutar la consulta SQL
        let [result] = await pool.query(sql, params);

        console.log(result);
        if (result.affectedRows > 0) {
            let respuesta = {
                error: false, codigo: 200,
                mensaje: "Se ha editado la prenda", data: result
            }
            response.send(respuesta);
        }
        else {
            let respuesta = {
                error: true, codigo: 400,
                mensaje: "algo ha salido mal", dataPrenda: result
            }
            response.send(respuesta);
        }

    }
    catch (error) {
        console.log(error);
    }
};


const postPrenda = async (request, response) => {
    try {
        console.log(request.body);
        let sql = "INSERT INTO prenda (title, price, description, state, size, event, type, photo1, photo2, photo3, photo4,iduser) " +
            "VALUES ('" + request.body.title + "','" +
            request.body.price + "','" +
            request.body.description + "','" +
            request.body.state + "','" +
            request.body.size + "','" +
            request.body.event + "','" +
            request.body.type + "','" +
            request.body.photo1 + "','" +
            request.body.photo2 + "','" +
            request.body.photo3 + "','" +
            request.body.photo4 + "','" +
            request.body.iduser + "')"
            

        console.log(sql);
        let [result] = await pool.query(sql);
        console.log(result);

        if(result.affectedRows > 0){
            let respuesta = {error:false, codigo:200,
                mensaje:"Se ha editado la prenda", dataPrenda:result}
            response.send(respuesta);
          }
          else 
          {
            let respuesta = {error:true, codigo:400,
                mensaje:"algo ha salido mal", dataPrenda:result}
            response.send(respuesta);
        }
    }
    catch (error) {
        console.log(error);
    }
      
}

const getMisPrendas = async (request, response) =>
{
    try
    {
        
        let sql = "SELECT * FROM prenda WHERE iduser =" + request.query.iduser;

        let [result] = await pool.query(sql);
        let respuesta = {
            error: false, codigo: 200,
            mensaje: "estos son tus prendas", data: result
        }
        response.send(respuesta);
    }
    catch (err) {
        console.log(err);
    }
}

const postFav = async (request, response) => {
    try {
        console.log(request.body);
        let sql = "INSERT INTO favoritos (iduser, idprenda) " + 
            " VALUES ('" + request.body.iduser + "','" +
            request.body.idprenda + "')"             

        console.log(sql);
        let [result] = await pool.query(sql);
        console.log(result);

        if(result.affectedRows > 0){
            let respuesta = {error:false, codigo:200,
                mensaje:"Se ha editado la prenda", dataPrenda:result}
            response.send(respuesta);
          }
          else 
          {
            let respuesta = {error:true, codigo:400,
                mensaje:"algo ha salido mal", dataPrenda:result}
            response.send(respuesta);
        }
    }
    catch (error) {
        console.log(error);
    }
      
}


const getMisFavs = async (request, response) =>
{
    try
    {
        
        let sql = `SELECT * FROM prenda JOIN favoritos ON (prenda.idprenda = favoritos.idprenda) JOIN user ON (prenda.iduser = user.iduser) WHERE favoritos.iduser =` + request.query.iduser

        let [result] = await pool.query(sql);
        console.log(sql);
        console.log("-------------------------------");
        console.log(result);console.log("-------------------------------");
        console.log(request.query.idprenda);
        let respuesta = {
            error: false, codigo: 200,
            mensaje: "estos son tus prendas", data: result
        }
        response.send(respuesta);
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {getPrenda, editarPrenda,getPrendaHome,getEstado,getEvento,getTalla,getTipo, postPrenda, getMisPrendas, postFav, getMisFavs}
