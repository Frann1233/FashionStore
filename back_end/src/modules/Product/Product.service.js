import { prisma } from "../../main.js";

const create = async (req, res) => {
  const {
    name,
    description,
    price,
    sex,
    typeId,
    categoryId,
    brandId,
    materialId,
    styleId,
    seasonId,
    sizeId,
    colorId
  } = req.body;
  const image = req.file;

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      image,
      sex,
      type: {
        connect: {
          id: parseInt(typeId),
        }
      },
      category: {
        connect: {
          id: parseInt(categoryId),
        },
      },
      brand: {
        connect: {
          id: parseInt(brandId),
        },
      },
      material: {
        connect: {
          id: parseInt(materialId),
        },
      },
      style: {
        connect: {
          id: parseInt(styleId),
        },
      },
      season: {
        connect: {
          id: parseInt(seasonId),
        },
      },
      size: {
        connect: {
          id: parseInt(sizeId),
        },
      },
      color: {
        connect: {
          id: parseInt(colorId),
        },
      },
    },
  });

  res.send(product);
};


const getOne = async (req, res) => {
  const { id } = req.params;
  const specifiedProduct = await prisma.product.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      name: true,
      description: true,
      image: true,
      price: true,
      sex: true,
      type: {
        select: {
          name: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
      brand: {
        select: {
          name: true,
        },
      },
      material: {
        select: {
          name: true,
        },
      },
      style: {
        select: {
          name: true,
        },
      },
      season: {
        select: {
          name: true,
        },
      },
      size: {
        select: {
          name: true,
        },
      },
      color: {
        select: {
          name: true,
        },
      },
    },
  });

  res.send(specifiedProduct);
};

const updateOne = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const sex = req.body.sex;
  const typeId = req.body.typeId;
  const categoryId = req.body.categoryId;
  const brandId = req.body.brandId;
  const materialId = req.body.materialId;
  const styleId = req.body.styleId;
  const seasonId = req.body.seasonId;
  const sizeId = req.body.sizeId;
  const colorId = req.body.colorId;

  const productUpdate = await prisma.product.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
      description,
      price,
      sex,
      type: {
        connect: {
          id: parseInt(typeId),
        }
      },
      category: {
        connect: {
          id: parseInt(categoryId),
        },
      },
      brand: {
        connect: {
          id: parseInt(brandId),
        },
      },
      material: {
        connect: {
          id: parseInt(materialId),
        },
      },
      style: {
        connect: {
          id: parseInt(styleId),
        },
      },
      season: {
        connect: {
          id: parseInt(seasonId),
        },
      },
      size: {
        connect: {
          id: parseInt(sizeId),
        },
      },
      color: {
        connect: {
          id: parseInt(colorId),
        },
      },
    },
  });

  res.send(productUpdate);
};

const deleteOne = async (req, res) => {
  const id = req.body.id;
  const productDelete = await prisma.product.delete({
    where: {
      id: parseInt(id),
    },
  });

  res.send(productDelete);
};

export default { create, getOne, deleteOne, updateOne };