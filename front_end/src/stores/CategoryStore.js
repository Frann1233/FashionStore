import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import Pagination from './PaginationStore';

export default class CategoryStore {
  id = null;

  name = null;

  image = [];

  fetchedCategory = [];

  subCategories = [];

  count = null;

  httpService;

  pagination = new Pagination(1);

  constructor(httpService) {
    this.httpService = httpService;
    makeObservable(this, {
      id: observable,
      name: observable,
      image: observable,
      fetchedCategory: observable,
      subCategories: observable,
      count: observable,
      setId: action,
      setName: action,
      get: action,
      getMany: action,
      create: action,
      update: action,
      delete: action,
      findCategoryIdByName: action,
      getSubCategoryNamesById: action,
      fetchedCategoryAsStringArray: computed
    });
  }

  getPagination() {
    return this.pagination;
  }

  setId({ id }) {
    this.id = id;
  }

  setName({ name }) {
    this.name = name;
  }

  async get({ id }) {
    const result = await this.httpService.category.get({ categoryId: id });
    const {
      id: categoryId,
      name,
      subCategories,
      image,
    } = result.data;
    runInAction(() => {
      this.id = categoryId;
      this.name = name;
      this.image = image;
      this.subCategories = subCategories;
    });
    // console.log(result)
  }


  async getMany() {
    const result = await this.httpService.category.getMany({
      pagination: {
        skip: this.pagination.skip,
        take: this.pagination.take,
      },
    });
    runInAction(() => {
      this.pagination.setCount(result.data.count);
      this.count = result.data.count;
      this.fetchedCategory = Array.from(result.data).map((category) => ({
        id: category.id,
        name: category.name,
        subCategoryNames: Array.isArray(category.subCategories)
          ? category.subCategories.map((subCategory) => subCategory.name)
          : [],
      }));
    })
    // console.log(result)
  }

  async create() {
    const result = await this.httpService.category.create({
      name: this.name,
      image: this.image,
    });
    return result.data;
  }

  async update({
    name,
    image,
    categoryId
  }) {
    await this.httpService.category.update({
      name,
      image,
      categoryId: parseInt(categoryId, 10),
    })
  }

  async delete({ categoryId }) {
    const result = await this.httpService.category.delete({ categoryId });
    if (result.status === 200) {
      runInAction(() => {
        this.fetchedCategory = this.fetchedCategory.filter(
          (category) => category.id !== result.data.id,
        )
      })
    }
  }

  findCategoryIdByName(categoryNameToFind) {
    const foundCategory = this.fetchedCategory.find(category => category.name === categoryNameToFind);
    return foundCategory ? foundCategory.id : null;
  }

  async getSubCategoryNamesById(id) {
    const result = await this.httpService.category.get({ id }); // Replace 'category.get' with your actual API call
    runInAction(() => {
      this.subCategories = result.data.subCategories;
    });
  }

  get fetchedCategoryAsStringArray() {
    let result = [];
    this.fetchedCategory.map(category => {
      result.push(category.name)
    });
    return result;
  }
}