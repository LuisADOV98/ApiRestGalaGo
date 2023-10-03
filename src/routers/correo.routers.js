const {Router} = require('express');
const router = Router();

let envio = require("../controller/correo.controller");

router.post("/envio", envio.enviarMensaje)

module.exports = router;