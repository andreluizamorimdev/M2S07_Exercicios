const { Router } = require("express");
const {
  criar,
  listarTodos,
  listarUm,
  atualizar,
  deletar
} = require("../controllers/CursoController");

const cursosRoutes = new Router();

cursosRoutes.post("/", criar);

cursosRoutes.get("/", listarTodos);

cursosRoutes.get("/:id", listarUm);

cursosRoutes.put("/:id", atualizar);

cursosRoutes.delete("/:id", deletar);

module.exports = cursosRoutes;
