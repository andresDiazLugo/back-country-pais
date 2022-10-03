const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id:{
      type:DataTypes.STRING(4),
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flag_image:{
      type:DataTypes.STRING,
      allowNull: false
    },
    
    continent:{
      type: DataTypes.STRING,
      allowNull: false
    },
    capital:{
      type:DataTypes.STRING,
    
    },
    area:{
    type:DataTypes.STRING,
    allowNull: false
    },
    population:{
      type:DataTypes.STRING,
      allowNull: false
    }
  },{
    timestamps: false
  });
};
