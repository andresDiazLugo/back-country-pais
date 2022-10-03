const {Router} = require("express")
const router = Router();
const auth = require("../middleware/auth");
const {postActivity} = require("../controllers/ActivityControllers");

//-----------------------------------------------------------------------------------------------------
router.post("/",auth,postActivity);
//-----------------------------------------------------------------------------------------------------

module.exports = router;