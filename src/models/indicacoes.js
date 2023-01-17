'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Indicacoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Indicacoes.init({
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    id_projeto: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    id_metrica: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Indicacoes',
  });
  return Indicacoes;
};