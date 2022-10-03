const jwt = require('jsonwebtoken');
const {Users,Role} = require('../db');


module.exports= (req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(401).json({
            msg:"acceso no autorizado"
        })
    }
   const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token,process.env.SECRET, (err,decoded)=>{
        if(err){
            res.status(500).json({msg:"ha ocurrido un problema al decodificar el token", err})
         
        }else{
         
            Users.findByPk(decoded.user.id,{include:{
                model:Role
            }})
                .then(data=>{
                    console.log(data)
                    req.user = data
                    next()
                })
                .catch(err => console.log(err))
            
        }
    })
   
}