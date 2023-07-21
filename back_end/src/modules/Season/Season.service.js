import { prisma } from "../../main.js";

const create = async (req, res) => {
  const name = req.body.name;

  const Season = await prisma.season.create({
    data: {
      name,
    },
  });

  res.send(Season);
};

const get = async (req, res) => {
  const filterName = req.body.filterName;

  const Seasons = await prisma.season.findMany({
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

  res.send(Seasons);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const specifiedSeason = await prisma.season.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  res.send(specifiedSeason);
};

const updateOne = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;

  const SeasonUpdate = await prisma.season.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
    }
  })

  res.send(SeasonUpdate);
};

const deleteOne = async (req, res) => {
  const id = req.params.id;

  const SeasonDelete = await prisma.season.delete({
    where: {
      id: parseInt(id),
    },
  });

  res.send(SeasonDelete);
};

export default { create, get, getOne, updateOne, deleteOne };