import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import Pagination from './PaginationStore';

export default class CategoryStore {
  id = null;

  name = null;

  fetchedCategory = [];

  count = null;

  httpService;

  pagination = new Pagination(1);

  constructor(httpService) {
    this.httpService = httpService;
    makeObservable(this, {
      id: observable,
      name: observable,
      fetchedCategory: observable,
      count: observable,
      setId: action,
      setName: action,
      get: action,
      getMany: action,
      create: action,
      update: action,
      delete: action,
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
    const result = await this.httpService.category.get({ id });
    const {
      id: categoryId,
      name,
    } = result.data;
    runInAction(() => {
      this.id = categoryId;
      this.name = name;
    })
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
      this.fetchedCategory = Array.from(result.data);
    })
  }

  async create() {
    const result = await this.httpService.category.create({
      name: this.name,
    });
    return result.data;
  }

  async update({
    name,
    categoryId
  }) {
    await this.httpService.category.update({
      name,
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

  get fetchedCategoryAsStringArray() {
    let result = [];
    this.fetchedCategory.map(category => {
      result.push(category.name)
    });
    return result;
  }
}