const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Activity', {
    
    name: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    difficulty: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 1,
            max: 5
        }
    },

    duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min:1,
            max:24
        }
     },

     season: {
        type: DataTypes.STRING,
        allowNull: true,
     }


  }, {
    timestamps: false
  }
  
  )}