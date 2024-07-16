const Professor = require("../models/Professor");

class ProfessorController {
  async criar(request, response) {
    try {
      const { nome, disciplina, email } = request.body;

      if (!nome || !disciplina || !email) {
        return response
          .status(400)
          .json({ mensagem: "Preencha todos os campos!" });
      }

      const professor = await Professor.create({
        nome,
        disciplina,
        email
      });

      return response.status(201).json(professor);
    } catch (error) {
      response
        .status(500)
        .json({ mensagem: "Não foi possível criar novo professor" });
    }
  }

  async listarTodos(request, response) {
    try {
      const filtro = request.query;

      if (filtro.nome) {
        const professores = await Professor.findAll({
          where: {
            nome: filtro.nome
          }
        });

        return response.status(200).json(professores);
      }

      if (filtro.disciplina) {
        const professores = await Professor.findAll({
          where: {
            disciplina: filtro.disciplina
          }
        });

        return response.status(200).json(professores);
      }

      const professores = await Professor.findAll();

      return response.status(200).json(professores);
    } catch (error) {
      response
        .status(500)
        .json({ mensagem: "Não foi possível listar os professores" });
    }
  }

  async listarUm(request, response) {
    try {
      const { id } = request.params;

      const professor = await Professor.findByPk(id);

      if (!professor) {
        return response
          .status(404)
          .json({ mensagem: "Professor não encontrado" });
      }

      return response.status(200).json(professor);
    } catch (error) {
      response
        .status(500)
        .json({ mensagem: "Não foi possível listar o professor" });
    }
  }

  async atualizar(request, response) {
    try {
      const { id } = request.params;
      const { nome, disciplina, email } = request.body;

      const professor = await Professor.findByPk(id);

      if (!professor) {
        return response
          .status(404)
          .json({ mensagem: "Professor não encontrado" });
      }

      professor.nome = nome;
      professor.disciplina = disciplina;
      professor.email = email;

      await professor.save();

      return response.json(professor);
    } catch (error) {
      response
        .status(500)
        .json({ mensagem: "Não foi possível atualizar o professor" });
    }
  }

  async deletar(request, response) {
    try {
      const { id } = request.params;

      const professor = await Professor.findByPk(id);

      if (!professor) {
        return response
          .status(404)
          .json({ mensagem: "Professor não encontrado" });
      }

      await professor.destroy();

      return response.status(204).send();
    } catch (error) {
      response
        .status(500)
        .json({ mensagem: "Não foi possível deletar o professor" });
    }
  }
}

module.exports = new ProfessorController();
