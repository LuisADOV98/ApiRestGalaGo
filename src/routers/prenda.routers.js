const {Router} = require('express');
const router = Router();
const prendaCtrl = require("../controller/prenda.controller");

router.get("/landing-page", prendaCtrl.getPrenda)

module.exports = router;