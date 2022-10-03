const {DataTypes} = require("sequelize")

module.exports = (sequelize)=>{
    sequelize.define("Users",{
        id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull:false,
            primaryKey:true,
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                isEmail:{
                    msg:"El email tiene que ser un correo valido"
                }
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                len:{
                    args:[6,255],
                    msg: "la contraseña tiene que tener minimamente 6 caracteres"
                }
            }
        }
    },
    {
        timestamps: false
      })
}