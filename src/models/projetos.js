'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projetos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Projetos.init({
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    id_criador: {
      allowNull: false,
      type: DataTypes.STRING
    },
    nome: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3, 50],
          msg: "O nome do projeto precisa conter entre 3 e 50 caracteres."
        }
      }
    },
    descricao: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3, 255],
          msg: "A descricao do projeto precisa conter entre 3 e 255 caracteres."
        }
      }
    },
    metodologia: {
      allowNull: true,
      type: DataTypes.STRING
    },
    tipo: {
      allowNull: true,
      type: DataTypes.STRING
    },
    tamanho: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 10
    },
    gerente: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3, 100],
          msg: "O nome do gerente precisa conter entre 3 e 100 caracteres."
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Projetos',
  });
  return Projetos;
};