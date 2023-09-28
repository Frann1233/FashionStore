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
  { name: 'filterCategory', operator: 'contains', key: 'category.name' },
  { name: 'filterBrandId', operator: 'equals', key: 'brandId' },
  { name: 'filterMaterialId', operator: 'equals', key: 'materialId' },
  { name: 'filterStyleId', operator: 'equals', key: 'styleId' },
  { name: 'filterSeasonId', operator: 'equals', key: 'seasonId' },
  { name: 'filterSizeId', operator: 'contains', key: 'size' },
  { name: 'filterSize', operator: 'contains', key: 'size.name' },
  { name: 'filterColorId', operator: 'contains', key: 'color' },
  { name: 'filterColor', operator: 'contains', key: 'color.name' },
  { name: 'filterImageColor', operator: 'contains', key: 'images.color.name' },
  { name: 'minPrice', operator: 'gte', key: 'price' },
  { name: 'maxPrice', operator: 'lte', key: 'price' },
  { name: 'priceLow', operator: 'gte', key: 'price' },
  { name: 'priceHigh', operator: 'lte', key: 'price' },
];

const productMiddleware = async (req, res, next) => {
  try {
    let where = {};

    for (const filter of filters) {
      const value = req.query[filter.name];
      if (value) {
        if (filter.key.endsWith('Id')) {
          where[filter.key] = parseInt(value);
        } else if (filter.key.includes('.')) {
          const subObject = filter.key.split('.')
          where[subObject[0]] = {
            [subObject[1]]: {
              [filter.operator]: value
            }
          }
        } else {
          where[filter.key] = {
            [filter.operator]: value
          };
          console.log("Filter Conditions:", where);
        }
      }
    }

    const categoryId = req.query.categoryId;
    const subCategoryId = req.query.subCategoryId;
    const minPrice = parseFloat(req.query.minPrice);
    const maxPrice = parseFloat(req.query.maxPrice);
    const filterSize = req.query.size;
    const filterImageColor = req.query.imageColor;

    if (categoryId) {
      where.categoryId = parseInt(categoryId);
    }

    if (subCategoryId) {
      where.subcategoryId = parseInt(subCategoryId);
    }

    if (!isNaN(minPrice)) {
      where.price = {
        gte: minPrice,
      };
    }

    if (!isNaN(maxPrice)) {
      where.price = {
        ...where.price,
        lte: maxPrice,
      };
    }

    if (filterSize && Array.isArray(filterSize) && filterSize.length > 0) {
      where.size = {
        some: {
          name: {
            in: filterSize, // Use filterSize array to filter by multiple sizes
          },
        },
      };
    }

    if (filterImageColor && Array.isArray(filterImageColor) && filterImageColor.length > 0) {
      where.images = {
        some: {
          color: {
            name: {
              in: filterImageColor, // Use filterImageColor array to filter by multiple image color names
            },
          },
        },
      };
    }


    const skip = parseInt(req.query.skip ?? DEFAULT_PRODUCT_SKIP);
    const take = parseInt(req.query.take ?? DEFAULT_PRODUCT_TAKE);
    const sortByPrice = req.query.sortByPrice;
    let orderBy = {};
    if (sortByPrice === 'lowToHigh') {
      orderBy = { price: 'asc' };
    } else if (sortByPrice === 'highToLow') {
      orderBy = { price: 'desc' };
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
        images: true,
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
