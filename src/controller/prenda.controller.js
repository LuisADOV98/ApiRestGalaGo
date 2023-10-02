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

//EL BUENO
const getPrendaHome = async (req, res) =>
{
    try
    {
        let sql = "SELECT * FROM prenda order by idprenda desc limit 20";

        let [result] = await pool.query(sql);
        respuesta = {error:false, codigo:200, mensaje:"TODAS LAS PRENDAS", data: result}

        // PARA CUANDO SE APLIQUEN FILTROS
            let params = [req.query.tipo,
                req.query.size,
                req.query.price,
                req.query.evento,
                req.query.state]

            console.log("req.query.price: ", req.query.price);
            let column = ["tipo","size","price","evento","state"]; //array con las columnas //FALTA UBICACIÓN
            
            let find_undefined = true;                                  //condición para que pare el bucle cuando encuentre un parámetro
            for(let i=0; i< params.length && find_undefined; i++){      //recorre el params y acaba cuando encuentra un undefinden o termina el array
                if(params[i] !== undefined){                             //si el parámetro no es undefined y no es la columna precio entra
                    find_undefined = false;  
                    if(column[i] !== "price"){
                        sql = `SELECT * FROM prenda WHERE ${column[i]} = "${params[i]}" `              
                    }else if  (params[i] !== undefined){
                        sql = `SELECT * FROM prenda HAVING ${column[i]} <= ${params[i]} `
                    }                                               

                    for(let j=i+1; j < params.length; j++){             //empieza el segundo bucle para añadir AND si hay más filtros
                        if(params[j] !== undefined){ //el segundo bucle empieza donde acaba el primero +1
                            if(column[j] !== "price"){
                                sql += ` AND ${column[j]} = "${params[j]}" ` //añadimos los AND siempre que no sea undefine y la columna precio 
                            }else{
                                sql += ` AND ${column[j]} <= ${params[j]} ` //añadimos los AND siempre que no sea undefine y la columna precio  
                            }
                        }
                    }

                }
                console.log(req.query.price);
                console.log(params[i]);
                console.log(sql);
                
            }
            
            [result] = await pool.query(sql,params);
            respuesta = {error:false, codigo:200,mensaje:"estos son las prendas", data:result}
            console.log(result);

        res.send(respuesta);
    }
    catch(err)
    {
        console.log(err);
    }
}

// const getPrendaHome2 = async (req, res) =>
// {
//     try
//     {
//         let sql = "SELECT * FROM prenda order by idprenda desc limit 20";
//         let params = [];
//         let conditions = [];
//         // PARA CUANDO SE APLIQUEN FILTROS
//             let queryParams = {tipo: req.query.tipo,
//                                sizw: req.query.size,
//                                price: req.query.price,
//                                evento: req.query.evento,
//                                evento: req.query.state}

//             let column = ["tipo","size","price","evento","state"]; //array con las columnas //FALTA UBICACIÓN
            
//             for(let i=0; i< column.length; i++){      //recorre el params y acaba cuando encuentra un undefinden o termina el array
//                 if(queryParams[column[i]] != undefined){
//                     if(column[i] !== "price") {
//                         conditions.push(`${column[i]}=?`);
//                         params.push(queryParams[column[i]]);
//                     }else if(queryParams[column[i]] !== 0) {
//                         conditions.push(`${column[i]} <= ?`);
//                         params.push(queryParams[column[i]]);
//                     }
//                 } 
//              if(conditions.length > 0){
//                 sql += "WHERE" + conditions.join(" AND ");
//              }   
            
//             console.log(sql);

//             let [result] = await pool.query(sql,params);
//             respuesta = {error:false, codigo:200,mensaje:"estos son las prendas", data:result}
//             console.log(result);
//         }

//         res.send(respuesta);
//     }
//     catch(err)
//     {
//         console.log(err);
//     }
// }

// ---- FILTROS DE H0ME ---- // NO LA PUEDO COMENTAR
const getFiltro = async (req, res) =>
{
    try{
        let respuesta
        let params = [req.query.tipo,
                      req.query.size,
                      req.query.price,
                      req.query.evento,
                      req.query.state]

        let column = ["tipo","size","price","evento","state"]; //array con las columnas //FALTA UBICACIÓN
        
        let sql= `SELECT * FROM prenda `;                     //primera parte del filtro
        let find_undefined = true;                                  //condición para que pare el bucle cuando encuentre un parámetro
        for(let i=0; i< params.length && find_undefined; i++){      //recorre el params y acaba cuando encuentra un undefinden o termina el array
            if((params[i] != "undefined") && (column[i] != "price")){ //si el parámetro no es undefined y no es la columna precio entra
                find_undefined = false;                             //cambia el bool a false para que acabe el primer bloque
                sql += `WHERE ${column[i]} = "${params[i]}"`              //añade la primera columna filtrada 

                for(let j=i+1; j < params.length; j++){             //empieza el segundo bucle para añadir AND si hay más filtros
                    if((params[j] != "undefined") && (column[j] != "price")){ //el segundo bucle empieza donde acaba el primero +1
                        sql += ` AND ${column[j]} = "${params[j]}"` //añadimos los AND siempre que no sea undefine y la columna precio 

                    }else if((column[j] === "price") && (params[j] != 0)){                //si es la columna precio entra
                        sql += ` AND ${column[j]} <= ${params[j]}`  //la condición será que el dato lo recoge como un numero y debe ser <=
                    }
                }

            }else if((column[i] === "price") && (params[i] != 0)){                        //si es la columna precio entra
                sql += `${column[i]} <= ${params[i]}`               //la condición será que el dato lo recoge como un numero y debe ser <=
            }
        }
        console.log(sql);

        let [result] = await pool.query(sql,params);
        respuesta = {error:false, codigo:200, mensaje:"estos son las prendas", data:result}
        console.log(result);
       
        res.send(respuesta);
    
    }catch(err){
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
        let sql = "SELECT COLUMN_TYPE " +
                  "FROM information_schema.COLUMNS " +
                  "WHERE TABLE_SCHEMA = 'GalaGo' " +
                  "AND TABLE_NAME = 'prenda' " +
                  "AND COLUMN_NAME = 'evento' "

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
        let sql = "INSERT INTO prenda (title, price, description, state, size, evento, tipo, photo1, photo2, photo3, photo4,iduser) " +
            "VALUES ('" + request.body.title + "','" +
            request.body.price + "','" +
            request.body.description + "','" +
            request.body.state + "','" +
            request.body.size + "','" +
            request.body.evento + "','" +
            request.body.tipo + "','" +
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
const obtenerDetallesPrenda = async (request, response) => {
  try {
    let idPrenda = request.params.idprenda;
    const propietario = request.params.propietario;

    // Consulta SQL para obtener detalles de la prenda por su ID
    let sql = 'SELECT * FROM prenda WHERE idprenda = ?';

    // Ejecuta la consulta con el ID de la prenda proporcionado
    let [result] = await pool.query(sql, [idPrenda]);

    // Verifica si se encontraron resultados
    if (result.length === 0) {
      let respuesta = { error: true, mensaje: 'Prenda no encontrada', dataPrenda:result };
      response.send(respuesta);
    } else {

    // La prenda fue encontrada, devuelve los detalles
    let respuesta =  { error: false, codigo: 200, mensaje: 'Detalles de la prenda', dataPrenda: result };
    response.send(respuesta);
  }
  } catch (err) {
    console.error('Error al obtener detalles de la prenda:', err);
    return { error: true, mensaje: 'Error al obtener detalles de la prenda' };
  }
};


// module.exports = {getPrenda, editarPrenda,getPrendaHome,getEstado,getEvento,getTalla,getTipo,postPrenda,getFiltro, obtenerDetallesPrenda}

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
                mensaje:"Se ha añadido la prenda", dataPrenda:result}
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
        
        let sql = `SELECT * FROM prenda JOIN favoritos ON (prenda.idprenda = favoritos.idprenda) WHERE favoritos.iduser =` + request.query.iduser

        let [result] = await pool.query(sql);
        console.log(sql);
        console.log("-------------------------------");
        console.log(result);console.log("-------------------------------");
        console.log(request.query.idprenda);
        let respuesta = { // ESTE
            error: false, codigo: 200,
            mensaje: "Estas son tus prendas:", data: result
        }
        response.send(respuesta);
    }
    catch (err) {
        console.log(err);
    }
}

const deleteFav = async (request, response) => {
    try 
    {
        console.log("PRUEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        const {iduser, idprenda} = request.params;

        let sql = `DELETE FROM favoritos WHERE favoritos.iduser = ${pool.escape(iduser)} AND favoritos.idprenda = ${pool.escape(idprenda)}`;
        let [result] = await pool.query(sql);
        console.log(sql);
        console.log("-------------------------------");
        console.log(result);console.log("-------------------------------");

        let respuesta = { 
            error: false, codigo: 200,
            mensaje: "Se ha eliminado la prenda de tus favoritos.", data: result
        }
        response.send(respuesta);

    }
    catch (error) {
        console.log(err);
    }
}
/* const getMisFavs = async (request, response) =>
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
} */

module.exports = {getPrenda, editarPrenda,getPrendaHome,getEstado,getEvento,getTalla,getTipo, postPrenda, getMisPrendas, postFav, getMisFavs, getFiltro, obtenerDetallesPrenda, deleteFav}
