const { Router } = require("express");

const professoresRoutes = require("./professores.routes");
const {
  criar,
  listarTodos,
  listarUm,
  atualizar,
  deletar
} = require("../controllers/ProfessorController");

const professoresRoutes = new Router();

professoresRoutes.post("/", criar);
professoresRoutes.get("/", listarTodos);
professoresRoutes.get("/:id", listarUm);
professoresRoutes.put("/:id", atualizar);
professoresRoutes.delete("/:id", deletar);

module.exports = professoresRoutes;
