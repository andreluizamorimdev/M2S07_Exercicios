const Curso = require("../models/Curso");

class CursoController {
  async criar(request, response) {
    try {
      const { nome, duracao_horas } = request.body;
      if (!nome || !duracao_horas) {
        return response
          .status(400)
          .json({ message: "Nome e a duração do curso são obrigatórios" });
      }
      const curso = await Curso.create({
        nome,
        duracao_horas
      });

      return response.status(201).json(curso);
    } catch (error) {
      response
        .status(500)
        .json({ message: "Não foi possível cadastrar o curso" });
    }
  }

  async listarTodos(request, response) {
    try {
      const filtro = request.query;
      if (filtro) {
        const cursos = await Curso.findAll({
          where: {
            nome: filtro.nome,
            duracao_horas: filtro.duracao_horas
          }
        });
        return response.json(cursos);
      }

      const cursos = await Curso.findAll();

      return response.json(cursos);
    } catch (error) {
      response
        .status(500)
        .json({ message: "Não foi possível listar os cursos" });
    }
  }

  async listarUm(request, response) {
    try {
      const { id } = request.params;

      const curso = await Curso.findByPk(id);

      if (!curso) {
        return response.status(404).json({ message: "Curso não encontrado" });
      }

      return response.json(curso);
    } catch (error) {
      response.status(500).json({ message: "Não foi possível listar o curso" });
    }
  }

  async atualizar(request, response) {
    try {
      const { id } = request.params;
      const { nome, duracao_horas } = request.body;

      const curso = await Curso.findByPk(id);

      if (!curso) {
        return response.status(404).json({ message: "Curso não encontrado" });
      }

      curso.nome = nome;
      curso.duracao_horas = duracao_horas;

      await curso.save();

      return response.json(curso);
    } catch (error) {
      response
        .status(500)
        .json({ message: "Não foi possível atualizar o curso" });
    }
  }

  async deletar(request, response) {
    try {
      const { id } = request.params;

      const curso = await Curso.findByPk(id);

      if (!curso) {
        return response.status(404).json({ message: "Curso não encontrado" });
      }

      await curso.destroy();

      return response.json({ message: "Curso excluído com sucesso" });
    } catch (error) {
      response
        .status(500)
        .json({ message: "Não foi possível excluir o curso" });
    }
  }
}

module.exports = new CursoController();
