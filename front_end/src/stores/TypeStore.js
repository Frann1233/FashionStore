import { action, makeObservable, observable, runInAction } from 'mobx';
import Pagination from './PaginationStore';

export default class TypeStore {
  id = null;

  name = null;

  fetchedTypes = [];

  count = null;

  httpService;

  pagination = new Pagination(1);

  constructor(httpService) {
    this.httpService = httpService;
    makeObservable(this, {
      id: observable,
      name: observable,
      fetchedTypes: observable,
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
    const result = await this.httpService.type.get({ id });
    const {
      id: typeId,
      name,
    } = result.data;
    runInAction(() => {
      this.id = typeId;
      this.name = name;
    })
  }

  async getMany() {
    const result = await this.httpService.type.getMany({
      pagination: {
        skip: this.pagination.skip,
        take: this.pagination.take,
      },
    });
    runInAction(() => {
      this.pagination.setCount(result.data.count);
      this.count = result.data.count;
      this.fetchedTypes = Array.from(result.data);
    })
  }

  async create() {
    const result = await this.httpService.type.create({
      name: this.name,
    });
    return result.data;
  }

  async update({
    name,
    typeId
  }) {
    await this.httpService.type.update({
      name,
      typeId: parseInt(typeId, 10),
    })
  }

  async delete({ typeId }) {
    const result = await this.httpService.type.delete({ typeId });
    if (result.status === 200) {
      runInAction(() => {
        this.fetchedTypes = this.fetchedTypes.filter(
          (type) => type.id !== result.data.id,
        )
      })
    }
  }
}