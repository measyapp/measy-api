'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Avaliacoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Colaboradores, {
        foreignKey: 'id_autor'
      })
      this.belongsTo(models.Avaliacoes, {
        foreignKey: 'id_indicacao'
      })
      this.belongsTo(models.Indicacoes, {
        foreignKey: 'id_indicacao'
      })
    }
  }
  Avaliacoes.init({
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    id_autor: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    id_indicacao: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    nota: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 5,
      validate: {
        len: {
          args: [0, 5],
          msg: "A nota precisa ser um valor de 0 a 5."
        }
      }
    },
    comentario: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3, 255],
          msg: "O comentário precisa conter entre 3 e 255 caracteres."
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Avaliacoes',
  });
  return Avaliacoes;
};