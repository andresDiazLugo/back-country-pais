module.exports={
    show(req,res,next){
        if(req.user.id === req.country.id){
            next()
        }else{
            res.status(401).send("no esta autoriazado para ver los detalles")
        }
    }
}