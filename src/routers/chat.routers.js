const {Router} = require('express');
const router = Router();
const chatCtrl = require("../controller/chat.controller");


router.get("/chat", chatCtrl.getChat); //para mostrar la lista de chat
router.post("/chat", chatCtrl.createMensaje);//para crear un nuevo mensaje dentro de la lista de chat
router.get("/chat", chatCtrl.verificarChat);//
router.get("/conversacion",chatCtrl.getMensaje);//para mostrar los mensajes de una conversacion-chat determinado
// router.post("/chat", chatCtrl.postChat);

module.exports = router;