const {Activity,Country}= require('../db');

module.exports ={
    async postActivity(req,res,next){
        const{name,dificulty,duration,temporada,pais} = req.body;// en pais debo hacer un arreglo ya que pueden ser mas de un pais lo que puede venir en ese parametro
    
try {
    if(name && dificulty && duration && temporada && pais){
        const addDbActivity = await Activity.create({//agrego registro a mi tabla activdad 
            name,
            dificulty,
            duration,
            temporada
        })
    
       while(pais.length>0){//este while va iterar hasta que el arreglo no tenga nada de elementos
        let  resolve = await Country.findOne({//busco el registro en mi tabla Countri
            where:{
                name: pais.shift()//saco de mi arreglo el primer elemento
            }
        })
        await addDbActivity.addCountry(resolve)//agrego la relaciones a mi tabla intermedia
       }
        res.send("Los datos fueron cargados con exito");
    }else{
        res.status(404).send("hubo un error al ingresar sus datos");

    }
} catch (error) {
    next(error)//si llega haber algun error le paso el error al manejador de errores en el archvio app.js 
}
    }
}