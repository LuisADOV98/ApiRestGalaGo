const {pool} = require("../database");
const Chat = require("../models/chat");
const User = require("../models/user");


const getChat =async(req,res)=>{
    try{
      
        let { iduser} = req.query;
        let params = [iduser,iduser,iduser,iduser];
       
        let sql=`SELECT idchat, datehour, hasnewmessage, firstname, surname, photo FROM chat JOIN user ON ((chat.iduser1=user.iduser AND chat.iduser1!=?) OR
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
      
        
        // res.send(respuesta); 
   
}



// const getChat =async(req,res)=>
// {
//     try{
//         let sql;
//         let respuesta;
//         if(req.body.iduser!=null){
//         sql = `SELECT * FROM chat WHERE iduser1=?` + res.body.iduser;
//         let [resultado] = await pool.query(sql);
//         respuesta = {error: false, codigo: 200,mensaje:"Estos son los chats", res_chat: resultado};
//         console.log(resultado);
//     }
//         else{
//         sql=`iduser no encontrado`;
//         }
        
//         res.send(respuesta); 
        
//     }
//     catch(err)
//     {
//         console.log(err);
//     }
// }



// async function getChat(req,res){
//     const {id_user,idchat} = req.query;
//     const params = [id_user,idchat];
//     let answer;
//     let sql;
//     //-- Definir las peticiones dependiendo de los dos casos q se pueden dar
//     if (id_user != undefined && idchat == undefined) {
//         sql = `SELECT * FROM chat WHERE id_user = ?;`;
//     }else{
//         sql = `SELECT * FROM chat WHERE id_user = ? AND idchat = ?;`;
//     }

//     try {
//         const [respuesta] = await pool.query(sql,params);
//         if (respuesta.length === 0) {
//             answer = {error: true, code: 200, message: "Chat not found", data:null, result:respuesta};
//         }else{
//             answer = {error: false, code: 200, message: "Chat found", data:null, result:respuesta};
//         }
//         res.send(answer);
//     } catch (error) {
//         res.send(error)
//     }
// }

// async function delChat(req,res){ 
//     //const {idChat} = req.body;
//     // let params = [idChat];
//     let params = [req.body.idChat];
//     let sql = `DELETE FROM chat WHERE idChat = ?;`;

//     try {
//         const [result] = await pool.query(sql,params);
//         res.send(result);
//     } catch (error) {
//         res.send(error)
//     }
// }
//CONVERSACION-CHAT
async function postChat(req,res){
    const {idchat, photo, firstname, datehour, id_prenda, iduser} = req.body;
    const params = [idchat, photo, firstname, datehour, id_prenda, iduser];
    let sql= `INSERT INTO chat (idchat, photo, firstname, datehour, id_prenda, iduser) VALUES (?,?,?,?,?,?);`;
    let answer;

    try {
        const [data] = await pool.query(sql,params);
        if (data.length === 0) {
            answer = {error: true, code: 200, message: "Registration error", data:data, result:null};
        }else{
            answer = {error: false, code: 200, message: "Chat registered correctly", data:data, result:null};
        }
        res.send(answer);
    } catch (error) {
        res.send(error)
    }
}
// module.exports = {getChat,delChat}
module.exports = {getChat, postChat}