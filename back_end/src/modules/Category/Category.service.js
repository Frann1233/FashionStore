import { prisma } from "../../main.js";

const create = async (req, res) => {
  const name = req.body.name;
  const images = req.body.images;
  // const subCategories = req.body.subCategories

  const Category = await prisma.category.create({
    data: {
      name,
      images: images || [],
      // subCategories: subCategories || [],
    },
  });

  res.send(Category);
};

const get = async (req, res) => {
  const filterName = req.query.filterName
  const filterSubCategory = req.query.filterSubCategory
  const Categorys = await prisma.category.findMany({
    where: {
      AND: [
        {
          name: {
            contains: filterName,
          }
        },
        {
          subCategories: {
            some: {
              name: {
                contains: filterSubCategory,
              }
            }
          }
        }
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
    include: {
      subCategories: true,
    },
  });


  res.send(specifiedCategory);
};

const updateOne = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const images = req.body.images;
  const subCategories = req.body.subCategories;
  const CategoryUpdate = await prisma.category.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
      images: images || [],
      subCategories: subCategories || [],
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