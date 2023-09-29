const {Router} = require('express');
const router = Router();
const prendaCtrl = require("../controller/prenda.controller");

router.get("/landing-page", prendaCtrl.getPrenda); //muestra las 20 últimas prendas
router.get("/home", prendaCtrl.getPrendaHome); //muestra las 20 últimas prendas
// router.get("/home2", prendaCtrl.getPrendaHome2); //muestra las 20 últimas prendas
// RUTAS PARA EXTRAER ARRAY DE ENUM 
router.get("/tipo", prendaCtrl.getTipo); //muestra las 20 últimas prendas
router.get("/talla", prendaCtrl.getTalla); //muestra las 20 últimas prendas
router.get("/evento", prendaCtrl.getEvento); //muestra las 20 últimas prendas
router.get("/estado", prendaCtrl.getEstado); //muestra las 20 últimas prendas

router.put("/editar-prenda", prendaCtrl.editarPrenda); //edita una prenda por idprenda y iduser

router.post("/publicar-prenda", prendaCtrl.postPrenda);

// Filtros de HOME
router.get("/filtro", prendaCtrl.getFiltro);
module.exports = router;