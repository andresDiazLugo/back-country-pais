const {Users,Role} = require("../db");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
async sinIn(req,res){
    const {email,password} = req.body
    try {
       /* Searching for a user with the email that was passed in the request body. */
        const searchEmailDb = await  Users.findOne({
            where:{
                email:email
            }
        })
       /* Comparing the password that was passed in the request body with the password that is stored
       in the database. */
       
       /* Checking if the email or password is invalid. */
       if(searchEmailDb){
            const passwordComparate = bcrypt.compareSync(password, searchEmailDb.password)
            if(!passwordComparate){
                return res.status(404).json({
                    msg:"el email o contaraseña es invalida"
                })
            } 
            
            /* This is checking if the email that was passed in the request body is the same as the email
            that is stored in the .env file. If it is, then it will create a role with the name "ADMIN"
            and if it is not, then it will create a role with the name "USERS". */
             
                 /* Creating a token with the user data and the secret key. */
                 const token = jwt.sign({user:searchEmailDb},process.env.SECRET,{
                     expiresIn: "20m"
                 })
               /* Returning the user data and the token. */
                 return res.status(200).json({
                     user:true,
                     token
                 })
        }
        return res.status(404).json({
            msg:"el email o contaraseña es invalida"
        })
    } catch (error) {
       /* Logging the error and returning a 500 status code. */
        console.log(error)
        return res.status(500).json({
            msg: error
        })
    }

},
////////////////////////////////////////////////////////////////////////////////////////////////////
async signUp(req,res){
        /* Hashing the password. */
        let password = bcrypt.hashSync(req.body.password, 10)
        try {
          /* Creating a new user in the database. */
            const userExists= await Users.findOne({
                where:{
                    email:req.body.email
                }
            })
            if(userExists){
                return res.status(404).json({
                    msg:"este email ya fue registrado"
                })
            }
            const userCreate = await Users.create({
                email: req.body.email,
                password:password
            })
            if(process.env.ADMIN === await req.body.email){
                let createRoleAdmin = Role.create({
                    role:"ADMIN",
                    UserId:userCreate.id
                })
            }else{
                let createRoleUser = await Role.create({
                    role:"USERS",
                    UserId:userCreate.id            
                })
            }
          /* Creating a token with the user data and the secret key. */
            // const token = jwt.sign({user:userCreate},process.env.SECRET,{
            //     expiresIn: "3m"
            // })
       return  res.status(200).json({
            user:true,
        })
    
        } catch (error) {
            console.log(error)
            const {errors} = error
            const msg = errors[0].message
            res.status(500).json({
                // msg: error,
                msg
            })
                     
        }
    }
}