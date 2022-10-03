const { Router } = require('express');
const router = Router();
const countrieMidlleware = require("./countries");
const activityMidlleware = require("./acitvity");
const registroMidlleware = require("./users")


router.use("/countries",countrieMidlleware);
router.use("/activity",activityMidlleware );
router.use("/registro",registroMidlleware)





module.exports = router;
