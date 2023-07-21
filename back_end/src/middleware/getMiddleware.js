import { prisma } from "../main.js";

const DEFAULT_PRODUCT_SKIP = 0;
const DEFAULT_PRODUCT_TAKE = 16;

const filters = [
  { name: 'filterName', operator: 'contains', key: 'name' },
  { name: 'filterDescription', operator: 'contains', key: 'description' },
  { name: 'filterPrice', operator: 'contains', key: 'price' },
  { name: 'filterSex', operator: 'equals', key: 'sex' },
  { name: 'filterTypeId', operator: 'equals', key: 'typeId' },
  { name: 'filterCategoryId', operator: 'equals', key: 'categoryId' },
  { name: 'filterBrandId', operator: 'equals', key: 'brandId' },
  { name: 'filterMaterialId', operator: 'equals', key: 'materialId' },
  { name: 'filterStyleId', operator: 'equals', key: 'styleId' },
  { name: 'filterSeasonId', operator: 'equals', key: 'seasonId' },
  { name: 'filterSizeId', operator: 'equals', key: 'sizeId' },
  { name: 'filterColorId', operator: 'equals', key: 'colorId' },
];

const productMiddleware = async (req, res, next) => {
  try {
    let where = {};

    for (const filter of filters) {
      const value = req.query[filter.name];
      if (value) {
        if (filter.key.endsWith('Id')) {
          where[filter.key] = parseInt(value);
        } else {
          where[filter.key] = {
            [filter.operator]: value
          };
        }
      }
    }

    const skip = parseInt(req.query.skip ?? DEFAULT_PRODUCT_SKIP);
    const take = parseInt(req.query.take ?? DEFAULT_PRODUCT_TAKE);
    const orderByPrice = req.query.orderByPrice;
    let orderBy = {};
    if (orderByPrice === 'lowToHigh') {
      orderBy = {
        price: 'asc',
      };
    } else if (orderByPrice === 'HighToLow') {
      orderBy = {
        price: 'desc',
      }
    }
    const products = await prisma.product.findMany({
      skip,
      take,
      where,
      orderBy,
      select: {
        id: true,
        name: true,
        description: true,
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

    const productCount = await prisma.product.count({ where });
    const result = {
      data: products,
      count: productCount
    };
    res.send(result);
  } catch (err) {
    next(err);
  }
};

export default productMiddleware;
