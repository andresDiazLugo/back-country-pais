const {Router} = require("express"); 

const router = Router();
const sig = require("../controllers/AuthController")

router.post('/singup',sig.signUp);
router.post('/singin',sig.sinIn);

module.exports=router