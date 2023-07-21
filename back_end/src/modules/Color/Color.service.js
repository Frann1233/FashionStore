import { prisma } from "../../main.js";

const create = async (req, res) => {
  const name = req.body.name;

  const Color = await prisma.color.create({
    data: {
      name,
    },
  });
  res.send(Color);
};

const get = async (req, res) => {
  const filterName = req.body.filterName
  const Colors = await prisma.color.findMany({
    where: {
      AND: [
        {
          name: {
            contains: filterName,
          }
        },
      ],
    }
  });
  res.send(Colors);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const specifiedColor = await prisma.color.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  res.send(specifiedColor);
};

const updateOne = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const ColorUpdate = await prisma.color.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
    },
  });
  res.send(ColorUpdate);
};

const deleteOne = async (req, res) => {
  const id = req.params.id;
  const ColorDelete = await prisma.color.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.send(ColorDelete);
};

export default { create, getOne, get, deleteOne, updateOne };