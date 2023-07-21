import { prisma } from "../../main.js";

const create = async (req, res) => {
  const name = req.body.name;

  const Category = await prisma.category.create({
    data: {
      name,
    },
  });

  res.send(Category);
};

const get = async (req, res) => {
  const filterName = req.query.filterName
  const Categorys = await prisma.category.findMany({
    where: {
      AND: [
        {
          name: {
            contains: filterName,
          }
        },
      ]
    }
  });

  res.send(Categorys);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const specifiedCategory = await prisma.category.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  res.send(specifiedCategory);
};

const updateOne = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const CategoryUpdate = await prisma.category.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
    },
  });

  res.send(CategoryUpdate);
};

const deleteOne = async (req, res) => {
  const id = req.params.id;
  const CategoryDelete = await prisma.category.delete({
    where: {
      id,
    },
  });

  res.send(CategoryDelete)
}

export default { create, getOne, get, deleteOne, updateOne };