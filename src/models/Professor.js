const { DataTypes } = require("sequelize");
const connection = require("../database/connection");

const Professor = connection.define(
  "professores",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    disciplina: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    paranoid: true
  }
);

module.exports = Professor;
