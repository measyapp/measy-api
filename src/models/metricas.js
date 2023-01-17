'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Metricas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Metricas.init({
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    nome: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3, 50],
          msg: "O nome da métrica precisa conter entre 3 e 50 caracteres."
        }
      }
    },
    descricao: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3, 255],
          msg: "A descricao da métrica precisa conter entre 3 e 255 caracteres."
        }
      }
    },
    tipo: {
      allowNull: true,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Metricas',
  });
  return Metricas;
};