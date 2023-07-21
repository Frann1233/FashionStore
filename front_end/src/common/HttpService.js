/* eslint-disable class-methods-use-this */
import axios from 'axios';
import consts from './Consts';

const instance = axios.create({
  baseURL: consts.DEFAULT_URL,
});

class HttpService {
  product;

  brand;

  color;

  material;

  category;

  season;

  size;

  style;

  type;

  constructor() {
    this.product = {
      get: this.#getProductById,
      getMany: this.#getProducts,
      update: this.#updateProduct,
      create: this.#createProduct,
      delete: this.#deleteProduct,
    };

    this.brand = {
      get: this.#getBrandById,
      getMany: this.#getBrands,
      create: this.#createBrand,
      update: this.#updateBrand,
      delete: this.#deleteBrand,
    };

    this.color = {
      get: this.#getColorById,
      getMany: this.#getColor,
      create: this.#createColor,
      update: this.#updateColor,
      delete: this.#deleteColor,
    };

    this.material = {
      get: this.#getMaterialById,
      getMany: this.#getMaterial,
      create: this.#createMaterial,
      update: this.#updateMaterial,
      delete: this.#deleteMaterial,
    };

    this.category = {
      get: this.#getCategoryById,
      getMany: this.#getCategory,
      create: this.#createCategory,
      update: this.#updateCategory,
      delete: this.#deleteCategory,
    };

    this.season = {
      get: this.#getSeasonById,
      getMany: this.#getSeason,
      create: this.#createSeason,
      update: this.#updateSeason,
      delete: this.#deleteSeason,
    };

    this.size = {
      get: this.#getSizeById,
      getMany: this.#getSize,
      create: this.#createSize,
      update: this.#updateSize,
      delete: this.#deleteSize,
    };

    this.style = {
      get: this.#getStyleById,
      getMany: this.#getStyle,
      create: this.#createStyle,
      update: this.#updateStyle,
      delete: this.#deleteStyle,
    };

    this.type = {
      get: this.#getTypeById,
      getMany: this.#getType,
      create: this.#createType,
      update: this.#updateType,
      delete: this.#deleteType,
    };
  }

  //Product
  async #getProducts({
    pagination: { skip, take },
    sortASC,
    sortName,
    filter,
  }) {
    const result = await instance.get('/product', {
      params: {
        take,
        skip,
        sortASC,
        sortName,
        ...filter,
      },
    });
    return result;
  }

  async #getProductById({ productId }) {
    const result = await instance.get(`/product/${productId}`);
    return result;
  }

  async #updateProduct({
    id,
    name,
    description,
    price,
    image,
    type,
    category,
    brand,
    material,
    style,
    season,
    size,
    color,
    sex,
  }) {
    const result = await instance.patch(`/product/${id}`, {
      name,
      description,
      price,
      image,
      type,
      category,
      brand,
      material,
      style,
      season,
      size,
      color,
      sex,
    });
    return result;
  }

  async #createProduct({
    name,
    description,
    price,
    image,
    type,
    category,
    brand,
    material,
    style,
    season,
    size,
    color,
    sex,
  }) {
    const result = await instance.post('/product', {
      name,
      description,
      price,
      image,
      type,
      category,
      brand,
      material,
      style,
      season,
      size,
      color,
      sex,
    });
    return result;
  }

  async #deleteProduct({ productId }) {
    const result = await instance.delete('/product', {
      data: {
        productId,
      },
    });
    return result;
  }

  //Brand
  async #getBrands({ pagination: { skip, take } }) {
    const result = await instance.get('/brand', {
      params: {
        take,
        skip,
      },
    });
    return result;
  }

  async #getBrandById({ brandId }) {
    const result = await instance.get(`/brand/${brandId}`);
    return result;
  }

  async #createBrand({ name }) {
    const result = await instance.post('/brand', {
      name,
    });
    return result.data;
  }

  async #updateBrand({ brandId, name }) {
    const result = await instance.patch(`/brand/${brandId}`, {
      name,
    });
    return result.data;
  }

  async #deleteBrand({ brandId }) {
    const result = await instance.delete(`/brand/${brandId}`);
    return result;
  }

  //Category
  async #getCategory({ pagination: { skip, take } }) {
    const result = await instance.get('/category', {
      params: {
        take,
        skip,
      },
    });
    return result;
  }

  async #getCategoryById({ categoryId }) {
    const result = await instance.get(`/category/${categoryId}`);
    return result;
  }

  async #createCategory({ name }) {
    const result = await instance.post('/category', {
      name,
    });
    return result.data;
  }

  async #updateCategory({ categoryId, name }) {
    const result = await instance.patch(`/category/${categoryId}`, {
      name,
    });
    return result.data;
  }

  async #deleteCategory({ categoryId }) {
    const result = await instance.delete(`/brands/${categoryId}`);
    return result;
  }

  //Color
  async #getColor({ pagination: { skip, take } }) {
    const result = await instance.get('/color', {
      params: {
        take,
        skip,
      },
    });
    return result;
  }

  async #getColorById({ colorId }) {
    const result = await instance.get(`/color/${colorId}`);
    return result;
  }

  async #createColor({ name }) {
    const result = await instance.post('/color', {
      name,
    });
    return result.data;
  }

  async #updateColor({ colorId, name }) {
    const result = await instance.patch(`/color/${colorId}`, {
      name,
    });
    return result.data;
  }

  async #deleteColor({ colorId }) {
    const result = await instance.delete(`/brands/${colorId}`);
    return result;
  }

  //Material
  async #getMaterial({ pagination: { skip, take } }) {
    const result = await instance.get('/material', {
      params: {
        take,
        skip,
      },
    });
    return result;
  }

  async #getMaterialById({ materialId }) {
    const result = await instance.get(`/material/${materialId}`);
    return result;
  }

  async #createMaterial({ name }) {
    const result = await instance.post('/material', {
      name,
    });
    return result.data;
  }

  async #updateMaterial({ materialId, name }) {
    const result = await instance.patch(`/material/${materialId}`, {
      name,
    });
    return result.data;
  }

  async #deleteMaterial({ materialId }) {
    const result = await instance.delete(`/material/${materialId}`);
    return result;
  }

  //Season
  async #getSeason({ pagination: { skip, take } }) {
    const result = await instance.get('/season', {
      params: {
        take,
        skip,
      },
    });
    return result;
  }

  async #getSeasonById({ seasonId }) {
    const result = await instance.get(`/season/${seasonId}`);
    return result;
  }

  async #createSeason({ name }) {
    const result = await instance.post('/season', {
      name,
    });
    return result.data;
  }

  async #updateSeason({ seasonId, name }) {
    const result = await instance.patch(`/season/${seasonId}`, {
      name,
    });
    return result.data;
  }

  async #deleteSeason({ seasonId }) {
    const result = await instance.delete(`/season/${seasonId}`);
    return result;
  }

  //Size
  async #getSize({ pagination: { skip, take } }) {
    const result = await instance.get('/size', {
      params: {
        take,
        skip,
      },
    });
    return result;
  }

  async #getSizeById({ sizeId }) {
    const result = await instance.get(`/size/${sizeId}`);
    return result;
  }

  async #createSize({ name }) {
    const result = await instance.post('/size', {
      name,
    });
    return result.data;
  }

  async #updateSize({ sizeId, name }) {
    const result = await instance.patch(`/size/${sizeId}`, {
      name,
    });
    return result.data;
  }

  async #deleteSize({ sizeId }) {
    const result = await instance.delete(`/season/${sizeId}`);
    return result;
  }

  //Style
  async #getStyle({ pagination: { skip, take } }) {
    const result = await instance.get('/style', {
      params: {
        take,
        skip,
      },
    });
    return result;
  }

  async #getStyleById({ styleId }) {
    const result = await instance.get(`/style/${styleId}`);
    return result;
  }

  async #createStyle({ name }) {
    const result = await instance.post('/style', {
      name,
    });
    return result.data;
  }

  async #updateStyle({ styleId, name }) {
    const result = await instance.patch(`/style/${styleId}`, {
      name,
    });
    return result.data;
  }

  async #deleteStyle({ styleId }) {
    const result = await instance.delete(`/style/${styleId}`);
    return result;
  }

  //Type
  async #getType({ pagination: { skip, take } }) {
    const result = await instance.get('/type', {
      params: {
        take,
        skip,
      },
    });
    return result;
  }

  async #getTypeById({ typeId }) {
    const result = await instance.get(`/type/${typeId}`);
    return result;
  }

  async #createType({ name }) {
    const result = await instance.post('/type', {
      name,
    });
    return result.data;
  }

  async #updateType({ typeId, name }) {
    const result = await instance.patch(`/type/${typeId}`, {
      name,
    });
    return result.data;
  }

  async #deleteType({ typeId }) {
    const result = await instance.delete(`/type/${typeId}`);
    return result;
  }


}

export default HttpService;