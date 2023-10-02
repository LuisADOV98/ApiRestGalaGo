const {pool} = require("../database");
const Chat = require("../models/chat");
const User = require("../models/user");


const getChat =async(req,res)=>{
    try{
      
        let { iduser} = req.query;
        let params = [iduser,iduser,iduser,iduser];
       
        let sql=`SELECT idchat, iduser2, datehour, hasnewmessage, firstname, surname, photo FROM chat JOIN user ON ((chat.iduser1=user.iduser AND chat.iduser1!=?) OR
        (chat.iduser2=user.iduser AND chat.iduser2!=?))
        WHERE iduser1=? OR iduser2=?;`;

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

const verificarChat = async (req, res)=> {
  try
    {
      const{iduser} =req.body;
      let params3 =[iduser,iduser,iduser,iduser];
      let sql3=`SELECT idchat FROM chat WHERE (iduser1 = ? AND iduser2 = ?) OR (iduser1 = ? AND iduser2 = ?) LIMIT 1;`;
      let [resultado3] = await pool.query(sql3,params3);
      if(resultado3.length > 0){
          res.send(resultado3);
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

const createMensaje = async (req, res) => {
    try {
    //   const { iduser1, iduser2, message } = req.body;
      const { iduser1, iduser2, message , datehour, hasnewmessage,idchat} = req.body;

      // Insertar un nuevo mensaje en la tabla de mensaje
    //   let sql1 = `INSERT INTO mensaje (iduser, message) VALUES (?, ?)`;
      let sql1 = `INSERT INTO mensaje (iduser, message,idchat) VALUES (?, ?,?)`;

      let messageParams = [iduser1, message,idchat];
      let [resultado1] = await pool.query(sql1, messageParams);
  
      let idmessage = resultado1.insertId;
  
      // Crear una nueva entrada en la tabla de chats
      let sql2 = `INSERT INTO chat (datehour,hasnewmessage,iduser1, iduser2) VALUES (?, ?, ?,?)`;
      let chatParams = [datehour,hasnewmessage,iduser1, iduser2];
    //   let chatParams = [datehour,hasnewmessage,iduser1, iduser2,idmessage];

      await pool.query(sql2, chatParams);
  
      res.status(201).json({ message: 'Conversación creada exitosamente' });
    } catch (error) {
      console.error('Error al crear conversación: ' + error.message);
      res.status(500).json({ error: 'Error al crear la conversación' });
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
        ORDER BY m.idmessage ASC;
      `;

      console.log(sql);
  
      let queryParams = [iduser1, iduser2, iduser2, iduser1];
  
      let [resultado] = await pool.query(sql, queryParams);
  
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
module.exports = {getChat,verificarChat, createMensaje,getMensaje}