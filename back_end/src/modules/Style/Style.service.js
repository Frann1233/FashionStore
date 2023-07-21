import { prisma } from "../../main.js";

const create = async (req, res) => {
  const name = req.body.name;

  const Style = await prisma.style.create({
    data: {
      name,
    },
  });

  res.send(Style);
};

const get = async (req, res) => {
  const filterName = req.body.filterName;

  const Styles = await prisma.style.findMany({
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

  res.send(Styles);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const specifiedStyle = await prisma.style.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  res.send(specifiedStyle);
};

const updateOne = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;

  const StyleUpdate = await prisma.style.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
    }
  })

  res.send(StyleUpdate);
};

const deleteOne = async (req, res) => {
  const id = req.params.id;

  const StyleDelete = await prisma.style.delete({
    where: {
      id: parseInt(id),
    },
  });

  res.send(StyleDelete);
};

export default { create, get, getOne, updateOne, deleteOne };