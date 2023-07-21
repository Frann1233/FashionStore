import { prisma } from "../../main.js";

const create = async (req, res) => {
  const name = req.body.name;

  const Size = await prisma.size.create({
    data: {
      name,
    },
  });

  res.send(Size);
};

const get = async (req, res) => {
  const filterName = req.body.filterName;

  const Sizes = await prisma.size.findMany({
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

  res.send(Sizes);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const specifiedSize = await prisma.size.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  res.send(specifiedSize);
};

const updateOne = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;

  const SizeUpdate = await prisma.size.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
    }
  })

  res.send(SizeUpdate);
};

const deleteOne = async (req, res) => {
  const id = req.params.id;

  const SizeDelete = await prisma.size.delete({
    where: {
      id: parseInt(id),
    },
  });

  res.send(SizeDelete);
};

export default { create, get, getOne, updateOne, deleteOne };