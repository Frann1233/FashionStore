import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import Pagination from './PaginationStore';

export default class BrandStore {
  id = null;

  name = null;

  fetchedBrand = [];

  count = null;

  httpService;

  pagination = new Pagination(1);

  constructor(httpService) {
    this.httpService = httpService;
    makeObservable(this, {
      id: observable,
      name: observable,
      fetchedBrand: observable,
      count: observable,
      setId: action,
      setName: action,
      get: action,
      getMany: action,
      create: action,
      update: action,
      delete: action,
      fetchedBrandAsStringArray: computed,
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
    const result = await this.httpService.brand.get({ id });
    const {
      id: brandId,
      name,
    } = result.data;
    runInAction(() => {
      this.id = brandId;
      this.name = name;
    })
  }

  async getMany() {
    const result = await this.httpService.brand.getMany({
      pagination: {
        skip: this.pagination.skip,
        take: this.pagination.take,
      },
    });
    runInAction(() => {
      this.pagination.setCount(result.data.count);
      this.count = result.data.count;
      this.fetchedBrand = Array.from(result.data);
    })
  }

  async create() {
    const result = await this.httpService.brand.create({
      name: this.name,
    });
    return result.data;
  }

  async update({
    name,
    brandId
  }) {
    await this.httpService.brand.update({
      name,
      brandId: parseInt(brandId, 10),
    })
  }

  async delete({ brandId }) {
    const result = await this.httpService.brand.delete({ brandId });
    if (result.status === 200) {
      runInAction(() => {
        this.fetchedBrand = this.fetchedBrand.filter(
          (brand) => brand.id !== result.data.id,
        )
      })
    }
  }

  get fetchedBrandAsStringArray() {
    let result = [];
    this.fetchedBrand.map(brand => {
      result.push(brand.name)
    });
    console.log(result)
    return result;
  }
}