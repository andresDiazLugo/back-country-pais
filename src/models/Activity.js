
const {DataTypes}= require("sequelize")

module.exports = (sequelize)=>{
    sequelize.define("activity",{
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        dificulty:{
            type: DataTypes.INTEGER,
            validate:{
                max : 5
            },
           allowNull:false
        },
        duration:{
            type: DataTypes.INTEGER
        },
        temporada:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: false
    })
}