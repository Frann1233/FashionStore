import { action, makeObservable, observable, runInAction } from 'mobx';
import Pagination from './PaginationStore';

export default class MaterialStore {
  id = null;

  name = null;

  fetchedMaterial = [];

  count = null;

  httpService;

  pagination = new Pagination(1);

  constructor(httpService) {
    this.httpService = httpService;
    makeObservable(this, {
      id: observable,
      name: observable,
      fetchedMaterial: observable,
      count: observable,
      setId: action,
      setName: action,
      get: action,
      getMany: action,
      create: action,
      update: action,
      delete: action,
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
    const result = await this.httpService.material.get({ id });
    const {
      id: materialId,
      name,
    } = result.data;
    runInAction(() => {
      this.id = materialId;
      this.name = name;
    })
  }

  async getMany() {
    const result = await this.httpService.material.getMany({
      pagination: {
        skip: this.pagination.skip,
        take: this.pagination.take,
      },
    });
    runInAction(() => {
      this.pagination.setCount(result.data.count);
      this.count = result.data.count;
      this.fetchedMaterial = Array.from(result.data);
    })
  }

  async create() {
    const result = await this.httpService.material.create({
      name: this.name,
    });
    return result.data;
  }

  async update({
    name,
    materialId
  }) {
    await this.httpService.material.update({
      name,
      materialId: parseInt(materialId, 10),
    })
  }

  async delete({ materialId }) {
    const result = await this.httpService.material.delete({ materialId });
    if (result.status === 200) {
      runInAction(() => {
        this.fetchedMaterial = this.fetchedMaterial.filter(
          (material) => material.id !== result.data.id,
        )
      })
    }
  }
}