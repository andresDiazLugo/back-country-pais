const {Router} = require("express")
const router = Router();
const auth= require("../middleware/auth")//esto sirve para controla el token es  decir le voy a pedir el token ala ruta que neceste verificar
const {find,getCountry,searchCountry}= require("../controllers/CountriController")

 
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
router.get("/",getCountry)
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.get("/:idPais",searchCountry)

module.exports= router