import { prisma } from "../../main.js";

const create = async (req, res) => {
  const name = req.body.name;

  const Type = await prisma.type.create({
    data: {
      name,
    },
  });

  res.send(Type);
};

const get = async (req, res) => {
  const filterName = req.body.filterName;

  const Types = await prisma.type.findMany({
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

  res.send(Types);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const specifiedStyle = await prisma.type.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  res.send(specifiedStyle);
};

const updateOne = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;

  const TypeUpdate = await prisma.type.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
    }
  })

  res.send(TypeUpdate);
};

const deleteOne = async (req, res) => {
  const id = req.params.id;

  const TypeDelete = await prisma.type.delete({
    where: {
      id: parseInt(id),
    },
  });

  res.send(TypeDelete);
};

export default { create, get, getOne, updateOne, deleteOne };