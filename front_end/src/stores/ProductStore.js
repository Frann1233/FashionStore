import { action, makeObservable, observable, runInAction, toJS } from 'mobx';
import Pagination from './PaginationStore';

export const SORTBY_LABEL_NAME = 'Name';

export default class ProductStore {
  id = null;

  name = null;

  fetchedProduct = [];

  similarProducts = [];

  subCategoryProducts = [];

  fetchedSizes = [];

  fetchedImageColors = [];

  selectedSizes = [];

  count = null;

  description = null;

  price = null;

  images = [];

  sort = {
    by: null,
    asc: false,
  };

  type = null;

  category = null;

  brand = null;

  material = null;

  style = null;

  season = null;

  size = null;

  color = null;

  sex = null;

  subCategory = null;

  filter = {
    filterCategoryId: null,
    filterCategory: null,
    filterSex: null,
    size: this.selectedSizes,
    filterImageColors: this.selectedImageColors,
    subCategory: null,
    minPrice: null,
    maxPrice: null,
  };

  pagination = new Pagination();

  loading = false;

  constructor(httpService) {
    this.httpService = httpService;
    makeObservable(this, {
      id: observable,
      name: observable,
      fetchedProduct: observable,
      fetchedImageColors: observable,
      fetchedSizes: observable,
      selectedSizes: observable,
      similarProducts: observable,
      count: observable,
      description: observable,
      price: observable,
      images: observable,
      sort: observable,
      type: observable,
      category: observable,
      brand: observable,
      material: observable,
      style: observable,
      season: observable,
      size: observable,
      color: observable,
      sex: observable,
      filter: observable,
      setFetchedSizes: observable,
      setFetchedImageColors: observable,
      setMinPrice: action,
      setMaxPrice: action,
      setSortBy: action,
      setSortAsc: action,
      getPagination: action,
      setName: action,
      setDescription: action,
      setPrice: action,
      setImageFile: action,
      setCategory: action,
      setSex: action,
      setFilterCategory: action,
      setFilterSex: action,
      setFilterSubCategory: action,
      setSelectedSizes: action,
      setSelectedImageColors: action,
      getMany: action,
      get: action,
      update: action,
      create: action,
      delete: action,
      getSimilarProducts: action,
      getProductsBySubcategory: action,
      getProductSizes: action,
      getProductImageColors: action,
    });
  }

  getPagination() {
    return this.pagination;
  }

  setName(name) {
    runInAction(() => {
      this.name = name;
    });
  }

  setFetchedSizes(sizes) {
    runInAction(() => {
      this.fetchedSizes = sizes;
      // console.log(this.fetchedSizes)
    });
  }

  setFetchedImageColors(imageColors) {
    runInAction(() => {
      this.fetchedImageColors = imageColors;
      console.log(this.fetchedImageColors)
    })
  }


  setDescription(description) {
    runInAction(() => {
      this.description = description;
    });
  }

  setPrice(price) {
    runInAction(() => {
      this.price = price;
    });
  }

  setImageFile({ imageFile, colorName }) {
    const newImage = {
      src: URL.createObjectURL(imageFile),
      file: imageFile,
      colorName: colorName,
    };
    runInAction(() => {
      this.images.push(newImage);
    })
  }

  setSortBy(sortBy) {
    runInAction(() => {
      this.sort.by = sortBy;
    });
    this.getMany();
  }

  setSortAsc({ asc }) {
    runInAction(() => {
      this.sort.asc = asc;
    });
    this.getMany();
  }


  setCategory(category) {
    runInAction(() => {
      this.category = category;
      this.filter.filterCategory = category
    });
    this.getMany()
  }

  setCategoryId(categoryId) {
    runInAction(() => {
      this.filter.categoryId = categoryId;
    })
    this.getMany()
  }

  setSex(sex) {
    runInAction(() => {
      this.sex = sex.toUpperCase();
      this.filter.filterSex = sex.toUpperCase();
    });
  }

  setFilterCategory(category) {
    runInAction(() => {
      this.filter.filterCategoryId = category;
    });
    this.getMany();
  }

  setFilterSex(sex) {
    runInAction(() => {
      this.filter.filterSex = sex;
    });
    this.getMany();
  }

  setFilterSubCategory(subCategory) {
    runInAction(() => {
      this.filter.subCategory = subCategory;
    });
    this.getMany();
  }

  setMinPrice(minPrice) {
    runInAction(() => {
      this.filter.minPrice = minPrice;
    });
    this.getMany();
  }

  setMaxPrice(maxPrice) {
    runInAction(() => {
      this.filter.maxPrice = maxPrice;
    });
    this.getMany();
  }

  setSelectedSizes(sizes) {
    runInAction(() => {
      this.selectedSizes = sizes;
      this.filter.size = sizes
    });
    this.getMany();
  }

  setSelectedImageColors(imageColors) {
    runInAction(() => {
      this.selectedImageColors = imageColors;
      this.filter.ImageColors = imageColors;
    });
    this.getMany();
  }

  async get({ productId }) {
    const result = await this.httpService.product.get({ productId });
    runInAction(() => {
      this.id = result.data.id;
      this.name = result.data.name;
      this.description = result.data.description;
      this.price = result.data.price;
      this.images = result.data.images;
      this.type = result.data.type;
      this.category = result.data.category;
      this.brand = result.data.brand;
      this.material = result.data.material;
      this.style = result.data.style;
      this.season = result.data.season;
      this.size = result.data.size;
      this.color = result.data.color;
      this.sex = result.data.sex;
    });
    // console.log(result)
  }

  async getMany() {
    if (this.loading === false) {
      runInAction(() => {
        this.loading = true;
      });
      const result = await this.httpService.product.getMany({
        pagination: {
          skip: this.pagination.skip,
          take: this.pagination.take,
        },
        sortASC: this.sort.asc,
        sortName: this.sort.by === SORTBY_LABEL_NAME,
        filter: this.filter,
      });
      // console.log(this.filter)
      // console.log('Fetched Products:', result.data.data);

      runInAction(() => {
        this.fetchedProduct = result.data.data;
        this.loading = false;
        this.count = result.data.count;
        this.pagination.setCount(result.data.count);
      });
      // console.log(result)
    }
  }

  async update() {
    const images = this.images.map(imageObj => ({
      url: imageObj.src, // Use URL of the images for updating
      colorName: imageObj.colorName, // Pass the associated color name
    }));

    await this.httpService.product.update({
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      images: images,
      type: this.type,
      category: this.category,
      brand: this.brand,
      material: this.material,
      style: this.style,
      season: this.season,
      size: this.size,
      color: this.color,
      sex: this.sex,
    });
  }

  async create() {
    const images = this.images.map(imageObj => ({
      url: imageObj.src,
      colorName: imageObj.colorName,
    }));

    await this.httpService.product.create({
      name: this.name,
      description: this.description,
      price: this.price,
      images: images,
      type: this.type,
      category: this.category,
      brand: this.brand,
      material: this.material,
      style: this.style,
      season: this.season,
      size: this.size,
      color: this.color,
      sex: this.sex,
    });
  }

  async delete() {
    await this.httpService.product.delete({ productId: this.id });
    runInAction(() => {
      this.id = null;
      this.name = null;
      this.description = null;
      this.price = null;
      this.images = null;
      this.type = null;
      this.category = null;
      this.brand = null;
      this.material = null;
      this.style = null;
      this.season = null;
      this.size = null;
      this.color = null;
      this.sex = null;
    });
  }

  async getSimilarProducts(currentProductId) {
    if (!this.category || !this.sex || !this.material) {
      return [];
    }

    const result = await this.httpService.product.getSimilarProducts({
      category: this.category.name,
      sex: this.sex,
      material: this.material.name,
      id: this.id,
    });

    const filteredSimilarProducts = result.data.data.filter((product) => {
      return (
        product.sex === this.sex &&
        product.category.name === this.category.name &&
        product.material.name === this.material.name &&
        product.id !== this.id // Exclude the current product
      );
    });

    runInAction(() => {
      this.similarProducts = filteredSimilarProducts;
    });
  }

  async getProductsBySubcategory(subCategoryId) {

    const result = await this.httpService.product.getProductsBySubcategory({ subCategoryId });
    runInAction(() => {
      this.fetchedProduct = result.data;
    })
  }

  async getProductSizes(categoryId, subCategoryId) {
    try {
      const result = await this.httpService.product.getProductSizes({
        categoryId,
        subCategoryId,
      });

      this.setFetchedSizes(result);
    } catch (error) {
      // Handle any errors here
      console.error('Error fetching product sizes:', error);
    }
  }

  async getProductImageColors(categoryId, subCategoryId) {
    try {
      const result = await this.httpService.product.getProductImageColors({
        categoryId,
        subCategoryId,
      });

      console.log(result)
      this.setFetchedImageColors(result);
    } catch (error) {
      // Handle any errors here
      console.error('Error fetching product image colors:', error);
    }
  }

}

