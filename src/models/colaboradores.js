'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Colaboradores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Projetos, {
        foreignKey: 'id_criador'
      })
      this.hasMany(models.Avaliacoes, {
        foreignKey: 'id'
      })
    }
  }
  Colaboradores.init({
    id: {
      primaryKey: true,
      autoIncrement: false,
      type: DataTypes.INTEGER
    },
    nome: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3, 100],
          msg: "O nome do colaborador precisa conter entre 3 e 100 caracteres."
        }
      }
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
        len: {
          args: [3, 50],
          msg: "O email precisa conter entre 3 e 100 caracteres."
        }
      }
    },
    senha: {
      allowNull: false,
      type: DataTypes.STRING
    },
    cpf: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        is: '[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}',
        len: {
          args: [14],
          msg: "O CPF precisa conter 14 caracteres."
        }
      }
    },
    funcao: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 30],
          msg: "A função precisa conter entre 1 e 30 caracteres."
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Colaboradores',
  });
  return Colaboradores;
};