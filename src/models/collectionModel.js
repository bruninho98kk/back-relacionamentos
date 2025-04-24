import prisma from "../../prisma/prisma.js";

class CollectionModel {
  // Obter todas as coleções
  async findAll() {
    const colecoes = await prisma.collection.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(colecoes);

    return colecoes;
  }

  // Obter uma coleção pelo ID
  async findById(id) {
    const colecao = await prisma.collection.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        cards: true,
      },
    });

    return colecao;
  }

  // Criar uma nova coleção
  async create(
   name,
   description,
   releaseYear
  ) {
    const newCollection = await prisma.collection.create({
      data: {
        name,
        description,
        releaseYear
      },
    });

    return newCollection;
  }

  // Atualizar uma coleção
  async update(
    id,
    name,
    description,
    releaseYear,
   
  ) {
    const colecao = await this.findById(id);

    if (!colecao) {
      return null;
    }

 
    const data = {};
    if (name !== undefined) {
      data.name = name;
    }
    if (description !== undefined) {
      data.description = description;
    }
    if (releaseYear !== undefined) {
      data.releaseYear = releaseYear;
    }
   

    const collectionUpdated = await prisma.collection.update({
      where: {
        id: Number(id),
      },
      data,
    });

    return collectionUpdated;
  }

  // Remover uma coleção
  async delete(id) {
    const colecao = await this.findById(id);

    if (!colecao) {
      return null;
    }

    await prisma.collection.delete({
      where: {
        id: Number(id),
      },
    });

    return true;
  }
}

export default new CollectionModel();
