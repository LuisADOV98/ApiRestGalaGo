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
        
        // let sql=`SELECT idchat, datehour, hasnewmessage, message, firstname, surname, photo FROM chat 
        // INNER JOIN user ON ((chat.iduser1=u.iduser AND chat.iduser1!=?) 
        //           OR (chat.iduser2=user.iduser AND chat.iduser2!=?))
        // INNER JOIN GalaGo.mensaje ON (mensaje.idchat = chat.idchat)
        // WHERE iduser1=? 
        // ORDER BY idmessage DESC LIMIT 1;`

        // let sql =  `SELECT c.idchat, c.datehour, c.hasnewmessage, m.message, idmessage, u.firstname, u.surname, u.photo FROM GalaGo.chat AS c
        //             INNER JOIN GalaGo.user AS u ON ((c.iduser1=u.iduser AND c.iduser1!=iduser2) OR (c.iduser2=u.iduser AND c.iduser2!=iduser1))
        //             INNER JOIN GalaGo.mensaje AS m ON (m.idchat = c.idchat)
        //             WHERE iduser1=? AND c.idchat =?
        //             ORDER BY m.idmessage DESC LIMIT 1;`;
        console.log("params:", params);

        /* SELECT message FROM GalaGo.mensaje
          WHERE idchat = 1 ORDER BY idmessage DESC LIMIT 1;*/

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

          // if (!iduser1 || !iduser2) {
          // // Validar que se proporcionen ambos iduser1 e iduser2
          // return res.status(400).send({ error: true, mensaje: 'Se requieren iduser1 e iduser2' });
          // }   
          let params4 =[iduser1,iduser2,iduser2,iduser1];
          let sql4=`SELECT idchat FROM chat WHERE (iduser1 = ? AND iduser2 = ?) OR (iduser1 = ? AND iduser2 = ?) LIMIT 1;`;
          let [resultado3] = await pool.query(sql4,params4);
          //Para verificar que existe o no CHAT entre 2 usuarios
          if(resultado3.length == 0){
            // el tamaño es 0,entonces creo un nuevo CHAT.
            let datehour = new Date().toISOString(); // Obtener la fecha y hora actual
            let sql1 = `INSERT INTO chat (iduser1,iduser2,datehour,hasnewmessage) VALUES (?, ?,?,?)`;
            let chatParams = [iduser1,iduser2 ,datehour,"0"];
            let [resultado1] = await pool.query(sql1, chatParams);
  
            let respuesta = {error: false, codigo: 200, mensaje: "Chat creado exitosamente", data: resultado1}
        
            res.send(respuesta);
          }else
          {
            // Si ya existe un chat, enviar el resultado existente.
            
            respuesta = {error: false, codigo:200 ,mensaje:"Ya existe CHat", data:{}};
            res.send(respuesta);
          }
         
        } catch (err) {
          console.error('Error no se ha podido crear Chat:', err);
          return { error: true, mensaje: 'Error al crear Chat' };
        }
  };



  const getMensaje = async (req, res) => {
    try {
      const { iduser1, iduser2 } = req.query;
  
      // Consulta SQL para obtener los mensajes entre dos usuarios y los detalles de usuario
      let sql = `
        SELECT m.idmessage, m.message, m.iduser, m.idchat, u.firstname, u.photo
        FROM mensaje AS m
        JOIN user AS u ON m.iduser = u.iduser
        JOIN chat AS c ON m.idchat = c.idchat
        WHERE (c.iduser1 = ? AND c.iduser2 = ?) OR (c.iduser1 = ? AND c.iduser2 = ?)
        ORDER BY m.idmessage ASC;`;

      console.log("sql de getMensaje:\n",sql);
  
      let queryParams = [iduser1, iduser2, iduser2, iduser1];
  
      let [resultado] = await pool.query(sql, queryParams);

      res.status(200).json(resultado);
    } catch (error) {
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


//CONVERSACION-CHAT
// async function postChat(req,res){
//     const {idchat, photo, firstname, datehour, id_prenda, iduser} = req.body;
//     const params = [idchat, photo, firstname, datehour, id_prenda, iduser];
//     let sql= `INSERT INTO chat (idchat, photo, firstname, datehour, id_prenda, iduser) VALUES (?,?,?,?,?,?);`;
//     let answer;

//     try {
//         const [data] = await pool.query(sql,params);
//         if (data.length === 0) {
//             answer = {error: true, code: 200, message: "Registration error", data:data, result:null};
//         }else{
//             answer = {error: false, code: 200, message: "Chat registered correctly", data:data, result:null};
//         }
//         res.send(answer);
//     } catch (error) {
//         res.send(error)
//     }
// }
// module.exports = {getChat,delChat}
module.exports = {getChat,postChat,getMensaje,getUser2, getUser2}