import { prisma } from "../../main.js";

const create = async (req, res) => {
  const name = req.body.name;

  const Brand = await prisma.Brand.create({
    data: {
      name,
    },
  });

  res.send(Brand);
};

const get = async (req, res) => {
  const filterName = req.query.filterName

  const Brands = await prisma.brand.findMany({
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

  res.send(Brands);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const specifiedBrand = await prisma.brand.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  res.send(specifiedBrand);
};

const updateOne = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;

  const BrandUpdate = await prisma.brand.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
    },
  });

  res.send(BrandUpdate);
};

const deleteOne = async (req, res) => {
  const id = req.params.id;

  const BrandDelete = await prisma.brand.delete({
    where: {
      id,
    },
  });

  res.send(BrandDelete)
}

export default { create, getOne, get, deleteOne, updateOne };