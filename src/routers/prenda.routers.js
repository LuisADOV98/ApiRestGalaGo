const {Router} = require('express');
const router = Router();
const prendaCtrl = require("../controller/prenda.controller");

router.get("/landing-page", prendaCtrl.getPrenda);

router.put("/editar-prenda", prendaCtrl.editarPrenda);

router.post("/publicar-prenda", prendaCtrl.postPrenda)

module.exports = router;