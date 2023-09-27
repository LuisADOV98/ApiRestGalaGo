const {pool} = require("../database");
const Chat = require("../models/chat");


const getChat =async(req,res)=>
{
    try{
        let sql;
        let respuesta;
        if(req.body.iduser!=null){
        sql = `SELECT * FROM chat WHERE iduser1=?` + res.body.iduser;
        let [resultado] = await pool.query(sql);
        respuesta = {error: false, codigo: 200,mensaje:"Estos son los chats", res_chat: resultado};
        console.log(resultado);
    }
        else{
        sql=`iduser no encontrado`;
        }
        
        res.send(respuesta); 
        
    }
    catch(err)
    {
        console.log(err);
    }
}



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

// module.exports = {getChat,delChat}
module.exports = {getChat}