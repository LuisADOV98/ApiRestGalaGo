const {Router} = require('express');
const router = Router();
const prendaCtrl = require("../controller/prenda.controller");

router.get("/prendas20", prendaCtrl.getPrenda); //muestra las 20 últimas prendas

router.put("/editar-prenda", prendaCtrl.editarPrenda); //edita una prenda por idprenda y iduser



module.exports = router;