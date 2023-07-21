import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import Pagination from './PaginationStore';

export default class SizeStore {
  id = null;

  name = null;

  fetchedSize = [];

  count = null;

  httpService;

  pagination = new Pagination(1);

  constructor(httpService) {
    this.httpService = httpService;
    makeObservable(this, {
      id: observable,
      name: observable,
      fetchedSize: observable,
      count: observable,
      setId: action,
      setName: action,
      get: action,
      getMany: action,
      create: action,
      update: action,
      delete: action,
      fetchedSizeAsStringArray: computed,
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
    const result = await this.httpService.size.get({ id });
    const {
      id: sizeId,
      name,
    } = result.data;
    runInAction(() => {
      this.id = sizeId;
      this.name = name;
    })
  }

  async getMany() {
    const result = await this.httpService.size.getMany({
      pagination: {
        skip: this.pagination.skip,
        take: this.pagination.take,
      },
    });
    runInAction(() => {
      this.pagination.setCount(result.data.count);
      this.count = result.data.count;
      this.fetchedSize = Array.from(result.data);
    })
  }

  async create() {
    const result = await this.httpService.size.create({
      name: this.name,
    });
    return result.data;
  }

  async update({
    name,
    typeId
  }) {
    await this.httpService.size.update({
      name,
      typeId: parseInt(typeId, 10),
    })
  }

  async delete({ typeId }) {
    const result = await this.httpService.size.delete({ typeId });
    if (result.status === 200) {
      runInAction(() => {
        this.fetchedSize = this.fetchedSize.filter(
          (size) => size.id !== result.data.id,
        )
      })
    }
  }

  get fetchedSizeAsStringArray() {
    let result = [];
    this.fetchedSize.map(size => {
      result.push(size.name)
    });
    return result;
  }
}