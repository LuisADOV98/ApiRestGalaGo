const {Router} = require('express');
const router = Router();
const chatCtrl = require("../controller/chat.controller");


router.get("/chat", chatCtrl.getChat);
router.post("/chat", chatCtrl.postChat);
// router.delete("/chat", chatCtrl.delChat);

module.exports = router;