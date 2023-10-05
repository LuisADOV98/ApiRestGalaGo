const {pool} = require("../database");
const Chat = require("../models/chat");
const User = require("../models/user");


const getChat =async(req,res)=>{
    try{
      
        let {iduser} = req.query;
        let params = [iduser,iduser,iduser,iduser];
        console.log("req query!", req.query);
       
        let sql= `SELECT idchat, datehour, hasnewmessage, firstname, surname, photo FROM chat 
                  JOIN user ON ((chat.iduser1=user.iduser AND chat.iduser1!=?) 
                            OR (chat.iduser2=user.iduser AND chat.iduser2!=?))
                  WHERE iduser1=? OR iduser2=?;`;
    
        console.log("params:", params);

        let [resultado] = await pool.query(sql,params);
            if(resultado.length > 0){
                res.send(resultado);
            }else
            {
                res.send("No se encuentran chats ");
                // respuesta = {error: true, codigo: 200,mensaje:"No se encuentran usuarios", res_chat: resultado};
            }
        } 
    catch (error) {
            res.send(error);
            }
 
}

// const verificarChat = async (req, res)=> {
//   try
//     {
//       const{iduser} =req.body;
//       let params3 =[iduser,iduser,iduser,iduser];
//       let sql3=`SELECT idchat FROM chat WHERE (iduser1 = ? AND iduser2 = ?) OR (iduser1 = ? AND iduser2 = ?) LIMIT 1;`;
//       let [resultado3] = await pool.query(sql3,params3);
//       if(resultado3.length > 0){
//           res.send(resultado3);
//       }else
//       {
//           res.send("No se encuentran chats ");
//           // respuesta = {error: true, codigo: 200,mensaje:"No se encuentran usuarios", res_chat: resultado};
//       }
//   } 
// catch (error) {
//       res.send(error);
//       }

// }

const postChat = async (req, res) => {
    try {      
          const { iduser1, iduser2 } = req.body;
          console.log(iduser2);
          let params4 =[iduser1,iduser2,iduser2,iduser1];
          let sql4=`SELECT idchat FROM chat WHERE (iduser1 = ? AND iduser2 = ?) OR (iduser1 = ? AND iduser2 = ?) LIMIT 1;`;
          let [resultado3] = await pool.query(sql4,params4);
          let mensaje = "El Chat ya existe!"
          let idchat ;
          //Para verificar que existe o no CHAT entre 2 usuarios
          if(resultado3.length == 0){
            // el tamaño es 0,entonces creo un nuevo CHAT.
              let datehour = new Date().toISOString(); // Obtener la fecha y hora actual
              let sql1 = `INSERT INTO chat (iduser1,iduser2,datehour,hasnewmessage) VALUES (?, ?,?,?)`;
              let chatParams = [iduser1,iduser2 ,datehour,"0"];
              let [resultado1] = await pool.query(sql1, chatParams);
              mensaje="Se ha creado un nuevo Chat";  
              idchat= resultado1.insertId; //el insertId te devuelve el id de la tabla que necesitas.
            }
          else{
              idchat = resultado3[0].idchat;
              console.log(resultado3);
          }
            //hacer el SELECT de user y guardar en resultado1----------------PREGUNTAR
            // `SELECT firstname, photo FROM user;`;
            let sql6 = `SELECT * FROM user WHERE iduser=? ;`;
            let userParams = [iduser2];
            let [resultado1] = await pool.query(sql6,userParams);
          
            let respuesta = {error:false, codigo:200, mensaje:mensaje, data:resultado1, idchat:idchat};
          
            res.send(respuesta);
          
         
        } catch (err) {
          console.error('Error no se ha podido crear Chat:', err);
          return { error: true, mensaje: 'Error al crear Chat' };
        }
  };

const postMensaje = async (req, res) =>{
  try{

   
      const {message,iduser, idchat}=req.body;
      let sql5 = `INSERT INTO mensaje (message,iduser,idchat) VALUES (?, ?,?)`;
      console.log(sql5)
      let paramsMensaje=[message,iduser,idchat];
      console.log(paramsMensaje);
      let [resultado5] = await pool.query(sql5, paramsMensaje);
      let respuesta = {error: false, codigo: 200, mensaje: "Mensaje creado exitosamente", data: resultado5}
      res.send(respuesta);
/*       if(resultado5.length == 0){
        let respuesta = {error: false, codigo: 200, mensaje: "Mensaje creado exitosamente", data: resultado5}
        
        res.send(respuesta);
        }
      else{
        let respuesta ={error: false, codigo:200 ,mensaje:"Mensaje ya añadido", data:{}};
        res.send(respuesta);
      } */
    } catch (err) {
      console.error('Error no se ha podido crear mensaje:', err);
      return { error: true, mensaje: 'Error al crear mensaje' };
    }
}

  const getMensaje = async (req, res) => {
    try {
          const { idchat} = req.query;// SOLO PASAR EL IDCHAT Y OBTENER TODOS LOS MENSAJES DE ESE CHAT
          let sql = `SELECT *FROM mensaje WHERE idchat=?;`;
  
          console.log("sql de getMensaje:\n",sql);
  
          let queryParams = [idchat];
          let [resultado] = await pool.query(sql, queryParams);

          res.status(200).json(resultado);
        } 
    catch (error) {
          console.error('Error al obtener mensajes: ' + error.message);
          res.status(500).json({ error: 'Error al obtener mensajes' });
        }
  };
  
    //Datos del usuario2 para la CONVERSACIÓN 
    const getUser2 = async (req, res) => {
      try {
        const {iduser2} = req.params;
        console.log("user =====");
        console.log(iduser2);
        // Consulta SQL para obtener los mensajes entre dos usuarios y los detalles de usuario
        let sql = `SELECT u.iduser, u.firstname, u.surname,u.photo FROM chat AS c
                   INNER JOIN user AS u ON (c.iduser2 = u.iduser)
                   WHERE c.iduser2 = ` + iduser2;
  
        console.log("sql user2:\n",sql);
    
        let queryParams = [iduser2, iduser2];
    
        let [resultado] = await pool.query(sql, queryParams);
        console.log("resultado user2:", resultado);
  
        res.status(200).json(resultado);
      } catch (error) {
        console.error('Error al obtener mensajes: ' + error.message);
        res.status(500).json({ error: 'Error al obtener mensajes' });
      }
    };


module.exports = {getChat,postChat,getMensaje,postMensaje,getUser2, getUser2}