const {Activity,Country}= require('../db');
const axios = require("axios");
const {Op} = require("sequelize");
module.exports = {
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
   /* *|CURSOR_MARCADOR|* */
   async find(req,res,next){//esta funcion se va encargar de guradar en el obj req una propiedad country que va a contener el registro de los paises para despues dar seguridad a las rutas cuando quieramos eliminar o actualizar para que no lo haga cualquiera si no el rol que le corresponde
      /* Finding the country by its primary key. */
        const {idPais} = req.params
        let country = await Country.finByPk(idPais)
        if(!country){
            res.status(404).json({
                msg:"El detalle de este pais no existe"
            })
        }else{
            req.country = country
            next()
        }
    },
//_-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    async getCountry(req,res,next){
        const {name} = req.query//me traigo la queri que esta en la url
     
        try {
            let getApi 
            const veryfyDb = await Country.findAll({include:{model:Activity,attributes:["name"],
            through:{
               attributes:[]
           }
       }});// creo un verificador que me buscara en mis registros, en la base de datos que me servira de comprobacion para entrar en ciertas condiciones, para registros existentes o registros nulos
            
            let boolean = false//creo un inerruptor de condicion
            
            if(veryfyDb.length === 0){//verifico que tenga un arreglo vacio del registro que hice
                
                getApi = await axios.get("https://restcountries.com/v3/all")//obtengo el api de countries
                boolean=true//prendo o apago el interruptor dependiendo la condicion
            }
            
            let getAllCountries= "";//creo una variable con un string vacio para poder utilizarlo edentro del primer if
            
            if(boolean && name === undefined){
               
                const arrayApi = getApi.data.map(e=>{//creo un nuevo objeto extrayendo la propiedades que necesito del arreglo que trajo la promesa axios
                    const objApi= {
                    id:e.cca3,
                    name:e.name.common,
                    flag_image: e.flags[0],
                    continent:e.continents[0],
                    capital: e.capital ? e.capital[0] : "no se encontro capital",
                    area: String(e.area),
                    population:String(e.population)  
                    }
                   
                    return objApi
               
                });
                   
                Country.bulkCreate(arrayApi)//mando todo mi arreglo en simultaneo este metodo verificara los campos de mi DB y las propiedade de un objeto si todo coincide agrega todos los elementos a la base de datos
                   
                getAllCountries = await Country.findAll({include:{model:Activity,attributes:["name"],
                through:{
                   attributes:[]
               }
           }})
                 
                return res.status(200).json(getAllCountries)// devuelvo todos los registros que tengo en mi tabla Countries
            
                }if( boolean=== false && name === undefined){// esta condicion es para verificar si ya tengo los registros en mi base de datos, para no volver a llamar a la api
                  
                    res.status(200).json(veryfyDb)// devuelvo todos los registros que tengo en mi tabla Countries
           
                }else if(name){//si tenemos querie entramos en esta condicion 
                getAllCountries = await Country.findAll({//buscamos en un nuestra base los registros que conincidan con el campo name de nuestra base de datos el match no debe ser preciso por eso colocamos el metodo Like de sql
                    //agragame en mi consulta la informacion que contenga solo los campos name
                    where:{// buscame  en mi bs de datos el nombre que coincida con mi query
                        name :{
                            [Op.iLike]: '%'+name+'%'
                        }
                    }
                })
                
                return getAllCountries.length>0 ? res.status(202).json(getAllCountries):res.status(202).send("no se encontro resultados en la busqueda");//devuelvo el objetos o los objetos que matcheo
           
            }else{
              
                return res.status(404).send("no se encontro resultados en la busqueda")
           
            }
        } catch (error) {
         
            next(error); // si llega haber algun error le paso el error al manejador de errores en el archvio app.js 
        
        }
     
    },

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    async searchCountry(req,res){
        const {idPais} = req.params// me traigo los params que se le pasa a la url
 
        try {
           
            if(idPais){//verifico que no sea undefined
                
                const searchIdCountri = await Country.findOne({//busco  en los registros de mi bases de datos el registro con la id que se trae por params, incluyendo la tablas actividades
                    where:{
                        id: idPais,
                    },
                    include:{model:Activity,attributes:["name","dificulty","duration","temporada"],
                     through:{
                        attributes:[]
                    }
                },
                })
               res.status(200).json(searchIdCountri);// devuelvo el registro si se encontro
           
            }else{
               
                res.status(202).send("no se encontraron los resultados")// devuelvo este send si no encuentro mensaje
           
            }
        } catch (error){
           
            next(error)// si llega haber algun error le paso el error al manejador de errores en el archvio app.js 
        
        }
    }



}