import { prisma } from "../../main.js";

const create = async (req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const categoryId = req.body.categoryId;

  const SubCategory = await prisma.subCategory.create({
    data: {
      name,
      image,
      category: { connect: { id: categoryId } }
    },
  });

  res.send(SubCategory);
};

const get = async (req, res) => {
  const filterName = req.query.filterName
  const SubCategory = await prisma.subCategory.findMany({
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

  res.send(SubCategory)
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const SubCategory = await prisma.subCategory.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  res.send(SubCategory);
};

const updateOne = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const SubCategoryUpdate = await prisma.subCategory.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
      image,
    },
  });

  res.send(SubCategoryUpdate);
};

const deleteOne = async (req, res) => {
  const id = req.params.id;
  const SubCategoryDelete = await prisma.subCategory.delete({
    where: {
      id,
    },
  });

  res.send(SubCategoryDelete)
}

export default { create, getOne, get, deleteOne, updateOne };