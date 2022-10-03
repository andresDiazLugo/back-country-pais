const {DataTypes} = require("sequelize")
module.exports = sequelize =>{
    sequelize.define("Role",{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey:true
        },
        role:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    },
    {
        timestamps: false
      })
}