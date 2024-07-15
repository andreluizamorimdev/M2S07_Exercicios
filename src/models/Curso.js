const { DataTypes } = require("sequelize");
const connection = require("../database/connection");

const Curso = connection.define(
  "cursos",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    duracao_horas: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    paranoid: true
  }
);

module.exports = Curso;
