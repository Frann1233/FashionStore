import { action, makeObservable, observable, runInAction } from 'mobx';
import Pagination from './PaginationStore';

export const SORTBY_LABEL_NAME = 'Name';

export default class ProductStore {
  id = null;

  name = null;

  fetchedProduct = [];

  count = null;

  description = null;

  price = null;

  image = {
    src: null,
    file: null,
  };

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

  filter = {
    type: null,
    category: null,
    brand: null,
    material: null,
    style: null,
    season: null,
    size: null,
    color: null,
    sex: null,
  };

  pagination = new Pagination();

  loading = false;

  constructor(httpService) {
    this.httpService = httpService;
    makeObservable(this, {
      id: observable,
      name: observable,
      fetchedProduct: observable,
      count: observable,
      description: observable,
      price: observable,
      image: observable,
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
      getPagination: action,
      setName: action,
      setDescription: action,
      setPrice: action,
      setImageFile: action,
      setSortBy: action,
      setSortAsc: action,
      setType: action,
      setCategory: action,
      setBrand: action,
      setMaterial: action,
      setStyle: action,
      setSeason: action,
      setSize: action,
      setColor: action,
      setSex: action,
      setFilterType: action,
      setFilterCategory: action,
      setFilterBrand: action,
      setFilterMaterial: action,
      setFilterStyle: action,
      setFilterSeason: action,
      setFilterSize: action,
      setFilterColor: action,
      setFilterSex: action,
      getMany: action,
      get: action,
      update: action,
      create: action,
      delete: action,
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

  setImageFile({ imageFile }) {
    this.image.file = imageFile;
  }

  setSortBy({ sortBy }) {
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

  setType(type) {
    runInAction(() => {
      this.type = type;
    });
  }

  setCategory(category) {
    runInAction(() => {
      this.category = category;
    });
  }

  setBrand(brand) {
    runInAction(() => {
      this.brand = brand;
    });
  }

  setMaterial(material) {
    runInAction(() => {
      this.material = material;
    });
  }

  setStyle(style) {
    runInAction(() => {
      this.style = style;
    });
  }

  setSeason(season) {
    runInAction(() => {
      this.season = season;
    });
  }

  setSize(size) {
    runInAction(() => {
      this.size = size;
    });
  }

  setColor(color) {
    runInAction(() => {
      this.color = color;
    });
  }

  setSex(sex) {
    runInAction(() => {
      this.sex = sex;
    });
  }

  setFilterType(type) {
    runInAction(() => {
      this.filter.type = type;
    });
    this.getMany();
  }

  setFilterCategory(category) {
    runInAction(() => {
      this.filter.category = category;
    });
    this.getMany();
  }

  setFilterBrand(brand) {
    runInAction(() => {
      this.filter.brand = brand;
    });
    this.getMany();
  }

  setFilterMaterial(material) {
    runInAction(() => {
      this.filter.material = material;
    });
    this.getMany();
  }

  setFilterStyle(style) {
    runInAction(() => {
      this.filter.style = style;
    });
    this.getMany();
  }

  setFilterSeason(season) {
    runInAction(() => {
      this.filter.season = season;
    });
    this.getMany();
  }

  setFilterSize(size) {
    runInAction(() => {
      this.filter.size = size;
    });
    this.getMany();
  }

  setFilterColor(color) {
    runInAction(() => {
      this.filter.color = color;
    });
    this.getMany();
  }

  setFilterSex(sex) {
    runInAction(() => {
      this.filter.sex = sex;
    });
    this.getMany();
  }

  async get(productId) {
    const result = await this.httpService.product.get({ productId });
    runInAction(() => {
      this.id = result.data.id;
      this.name = result.data.name;
      this.description = result.data.description;
      this.price = result.data.price;
      this.image = result.data.image;
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

      runInAction(() => {
        this.fetchedProduct = result.data.data;
        this.loading = false;
        this.count = result.data.count;
        this.pagination.setCount(result.data.count);
      });
    }
  }

  async update() {
    await this.httpService.product.update({
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      image: this.image,
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
    await this.httpService.product.create({
      name: this.name,
      description: this.description,
      price: this.price,
      image: this.image,
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
      this.image = null;
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
}
