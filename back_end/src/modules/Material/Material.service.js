import { prisma } from "../../main.js";

const create = async (req, res) => {
  const name = req.body.name;

  const Material = await prisma.material.create({
    data: {
      name,
    },
  });

  res.send(Material);
};

const get = async (req, res) => {
  const filterName = req.body.filterName;

  const Materials = await prisma.material.findMany({
    where: {
      AND: [
        {
          name: {
            contains: filterName,
          },
        },
      ],
    }
  });

  res.send(Materials);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const specifiedMaterial = await prisma.material.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  res.send(specifiedMaterial);
};

const updateOne = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;

  const MaterialUpdate = await prisma.material.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
    }
  })

  res.send(MaterialUpdate);
};

const deleteOne = async (req, res) => {
  const id = req.params.id;

  const MaterialDelete = await prisma.material.delete({
    where: {
      id: parseInt(id),
    },
  });

  res.send(MaterialDelete);
};

export default { create, get, getOne, updateOne, deleteOne };