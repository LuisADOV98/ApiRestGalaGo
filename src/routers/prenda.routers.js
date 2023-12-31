const {Router} = require('express');
const router = Router();
const prendaCtrl = require("../controller/prenda.controller");

router.get("/landingpage", prendaCtrl.getPrenda); //muestra las 20 últimas prendas
router.get("/home", prendaCtrl.getPrendaHome); //muestra las 20 últimas prendas
// router.get("/home2", prendaCtrl.getPrendaHome2); //muestra las 20 últimas prendas
// RUTAS PARA EXTRAER ARRAY DE ENUM 
router.get("/tipo", prendaCtrl.getTipo); //muestra las 20 últimas prendas
router.get("/talla", prendaCtrl.getTalla); //muestra las 20 últimas prendas
router.get("/evento", prendaCtrl.getEvento); //muestra las 20 últimas prendas
router.get("/estado", prendaCtrl.getEstado); //muestra las 20 últimas prendas

router.put("/prenda", prendaCtrl.editarPrenda); //edita una prenda por idprenda y iduser
router.post("/prenda", prendaCtrl.postPrenda) //agrega una prenda

//Detalle prenda
// router.get('/prendaId/:idprenda', prendaCtrl.obtenerDetallesPrenda);

router.get("/perfil", prendaCtrl.getMisPrendas)//muestras las prendas del perfil que son del user
/* router.post("/perfil", prendaCtrl.postFav) *///añade a favoritos las prendas 
router.get("/favoritos", prendaCtrl.getMisFavs)//enseña los favoritos de un user en el perfil
router.post("/favoritos", prendaCtrl.postFav)

//elimina prenda favoritos
router.delete("/favoritos/:iduser/:idprenda", prendaCtrl.deleteFav)
router.delete("/prenda", prendaCtrl.deletePrenda)




router.get('/prendaId', prendaCtrl.obtenerDetallesPrenda);////CON PROPIETARIO
// router.get('/prendaId/:idprenda', prendaCtrl.obtenerDetallesPrenda);////SIN PROPIETARIO
// Filtros de HOME
router.get("/filtro", prendaCtrl.getFiltro);
module.exports = router;