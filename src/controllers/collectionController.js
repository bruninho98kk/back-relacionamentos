import CollectionModel from "../models/collectionModel.js";

class CollectionController {
  // GET /colecoes
  async getAllCollections(req, res) {
    try {
      const colecoes = await CollectionModel.findAll();
      res.json(colecoes);
    } catch (error) {
      console.error("Erro ao buscar as coleções:", error);
      res.status(500).json({ error: "Erro ao buscar as coleções" });
    }
  }

  // GET /colecoes/:id
  async getCollectionById(req, res) {
    try {
      const { name, description, releaseYear } = req.params;

      const colecao = await CollectionModel.findById(id);

      if (!name || !releaseYear ) {
        return res.status(400).json({ error: "Coleção não encontrada" });
      }

      res.json(colecao);
    } catch (error) {
      console.error("Erro ao buscar coleção:", error);
      res.status(500).json({ error: "Erro ao buscar coleção" });
    }
  }

  // POST /colecoes
  async createCollection(req, res) {
    try {
      // Extração dos dados do corpo da requisição
      const { name, description, releaseYear } = req.body;

      // Validação dos campos obrigatórios
      if (!name || !releaseYear) {
        return res.status(400).json({
          error: "Os campos 'name' e 'releaseYear' são obrigatórios.",
        });
      }

      // Criação da nova coleção
      const newCollection = await CollectionModel.create(name, description, releaseYear);

      // Retorno da nova coleção criada
      res.status(201).json(newCollection);
    } catch (error) {
      console.error("Erro ao criar coleção:", error);
      res.status(500).json({ error: "Erro ao criar coleção." });
    }
  }

  // PUT /api/personagens/:id
  async updateCollection(req, res) {
    try {
      const { id } = req.params;
      const {
        name,
        description,
        releaseYear
      
      } = req.body;

      // Atualizar o personagem
      const updatedCollection = await CollectionModel.update(
        id,
        name,
        description,
        releaseYear
      );

      if (!updatedCollection) {
        return res.status(404).json({ error: "Coleção não encontrada" });
      }

      res.json(updatedCollection);
    } catch (error) {
      console.error("Erro ao atualizar coleção:", error);
      res.status(500).json({ error: "Erro ao atualizar coleção!" });
    }
  }

  // DELETE collections
  async deleteCollection(req, res) {
    try {
      const { id } = req.params;

      // Remover a coleção
      const result = await CollectionModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Coleção não encontrada" });
      }

      res.status(200).json({
        message: "Coleção removida com sucesso",
      });
    } catch (error) {
      console.error("Erro ao remover coleção:", error);
      res.status(500).json({ error: "Erro ao remover coleção" });
    }
  }
}

export default new CollectionController();
