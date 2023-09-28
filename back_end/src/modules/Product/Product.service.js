import { parse } from "dotenv";
import { prisma } from "../../main.js";
import productMiddleware from "../../middleware/getMiddleware.js";

const create = async (req, res) => {
  const {
    name,
    description,
    price,
    images,
    sex,
    typeId,
    categoryId,
    brandId,
    materialId,
    styleId,
    seasonId,
    sizeId,
    colorId,
    subCategoryId
  } = req.body;
  // const image = req.file;

  let imagesFormatted = {
    connectOrCreate: images.map(image => {
      return {
        where: {
          url: image.url,
        },
        create: {
          url: image.url,
          color: {
            connectOrCreate: {
              where: {
                name: image.colorName
              },
              create: {
                name: image.colorName
              }
            }
          }
        }
      }
    })
  }
  let size = {
    connect: sizeId.map(size => {
      return {
        id: parseInt(size)
      }
    })
  }

  let color = {
    connect: colorId.map(color => {
      return {
        id: parseInt(color)
      }
    })
  }

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      sex,
      images: imagesFormatted,
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
      subCategory: {
        connect: {
          id: parseInt(subCategoryId),
        }
      },
      size,
      color,
    },
    include: {
      size: true,
      color: true,
      images: {
        include: {
          color: true,
        }
      },
      subCategory: true,
    }
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
      images: {
        include: {
          color: true
        }
      },
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
          subCategories: true,
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
  const images = req.body.images;
  const sex = req.body.sex;
  const typeId = req.body.typeId;
  const categoryId = req.body.categoryId;
  const brandId = req.body.brandId;
  const materialId = req.body.materialId;
  const styleId = req.body.styleId;
  const seasonId = req.body.seasonId;
  const sizeId = req.body.sizeId;
  const colorId = req.body.colorId;

  let imagesFormatted = {
    connectOrCreate: images.map(image => {
      console.log(image.colorName)
      return {
        where: {
          url: image.url,
        },
        create: {
          url: image.url,
          color: {
            connectOrCreate: {
              where: {
                name: image.colorName
              },
              create: {
                name: image.colorName
              }
            }
          }
        }
      }
    })
  }

  const productUpdate = await prisma.product.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
      description,
      price,
      images: {
        set: []
      },
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

  const rr = await prisma.product.update({
    where: {
      id: productUpdate.id
    },
    data: {
      images: imagesFormatted
    },
    include: {
      images: {
        include: {
          color: true
        }
      }
    }
  },)

  console.log(rr)

  res.send(productUpdate);
};

const deleteOne = async (req, res) => {
  const id = req.params.id;
  const productDelete = await prisma.product.delete({
    where: {
      id: parseInt(id),
    },
  });

  res.send(productDelete);
};

// const getManyByCategorySubCategory = async (req, res) => {
//   const categoryId = req.params.categoryId;
//   const subCategoryId = req.params.subCategoryId;

//   console.log(categoryId, subCategoryId)

//   const products = await prisma.product.findMany({
//     where: {
//       category: {
//         id: parseInt(categoryId),
//         subCategories: {
//           some: {
//             id: parseInt(subCategoryId)
//           }
//         }
//       }
//     },
//     select: {
//       name: true,
//       description: true,
//       images: {
//         include: {
//           color: true
//         }
//       },
//       price: true,
//       sex: true,
//       type: {
//         select: {
//           name: true,
//         },
//       },
//       category: {
//         select: {
//           name: true,
//           subCategories: true,
//         },
//       },
//       brand: {
//         select: {
//           name: true,
//         },
//       },
//       material: {
//         select: {
//           name: true,
//         },
//       },
//       style: {
//         select: {
//           name: true,
//         },
//       },
//       season: {
//         select: {
//           name: true,
//         },
//       },
//       size: {
//         select: {
//           name: true,
//         },
//       },
//       color: {
//         select: {
//           name: true,
//         },
//       },
//     },
//   })
//   res.send(products)
// }

// const getManyByCategorySubCategory = async (req, res) => {
//   const categoryId = parseInt(req.params.categoryId);
//   const subCategoryId = parseInt(req.params.subCategoryId);

//   const products = await prisma.product.findMany({
//     where: {
//       categoryId: categoryId,
//       subCategoryId: subCategoryId,
//     },
//     select: {
//       name: true,
//       description: true,
//       images: {
//         include: {
//           color: true,
//         },
//       },
//       price: true,
//       sex: true,
//       type: {
//         select: {
//           name: true,
//         },
//       },
//       category: {
//         select: {
//           name: true,
//           subCategories: true,
//         },
//       },
//       brand: {
//         select: {
//           name: true,
//         },
//       },
//       material: {
//         select: {
//           name: true,
//         },
//       },
//       style: {
//         select: {
//           name: true,
//         },
//       },
//       season: {
//         select: {
//           name: true,
//         },
//       },
//       size: {
//         select: {
//           name: true,
//         },
//       },
//       color: {
//         select: {
//           name: true,
//         },
//       },
//     },
//   });

//   res.send(products);
// };

const getProductsBySubCategory = async (req, res) => {
  try {
    const { subCategoryId } = req.params;

    // Fetch products with the specified subCategory ID
    const products = await prisma.product.findMany({
      where: {
        subCategoryId: parseInt(subCategoryId),
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        images: {
          include: {
            color: true,
          },
        },
        subCategory: true,
        sex: true,
        type: {
          select: {
            name: true,
          },
        },
        category: {
          select: {
            name: true,
            id: true,
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

    res.send(products);
  } catch (error) {
    // Handle errors here and send an appropriate response
    console.error("Error fetching products by subCategory:", error);
    res.status(500).send({ error: "Internal server error" });
  }

};

const getProductSizes = async (req, res) => {
  const { categoryId } = req.params;
  const { subCategoryId } = req.params;

  // Fetch products with the specified category or subcategory
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { categoryId: parseInt(categoryId) },
        { subCategoryId: parseInt(subCategoryId) },
      ],
    },
    select: {
      size: {
        select: {
          name: true,
        },
      },
    },
  });

  // Extract and consolidate sizes from the products
  const allSizes = [];
  products.forEach((product) => {
    product.size.forEach((size) => {
      allSizes.push(size.name);
    });
  });

  // Make sizes unique
  const uniqueSizes = [...new Set(allSizes)];

  res.json(uniqueSizes); // Send the unique sizes as a JSON response

};

const getImageColorNames = async (req, res) => {
  const { categoryId } = req.params;
  const { subCategoryId } = req.params;

  // Fetch products with the specified category or subcategory
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { categoryId: parseInt(categoryId) },
        { subCategoryId: parseInt(subCategoryId) },
      ],
    },
    select: {
      images: {
        select: {
          color: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  // Extract and consolidate image color names from the products
  const allImageColors = [];
  products.forEach((product) => {
    product.images.forEach((image) => {
      if (image.color) {
        allImageColors.push(image.color.name);
      }
    });
  });

  // Make image color names unique
  const uniqueImageColors = [...new Set(allImageColors)];

  res.json(uniqueImageColors); // Send the unique image color names as a JSON response
};






export default { create, getOne, deleteOne, updateOne, getProductsBySubCategory, getProductSizes, getImageColorNames };