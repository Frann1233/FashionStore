import { action, makeObservable, observable, runInAction } from 'mobx';
import Pagination from './PaginationStore';

export default class ColorStore {
  id = null;

  name = null;

  fetchedColor = [];

  count = null;

  httpService;

  pagination = new Pagination(1);

  constructor(httpService) {
    this.httpService = httpService;
    makeObservable(this, {
      id: observable,
      name: observable,
      fetchedColor: observable,
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
    const result = await this.httpService.color.get({ id });
    const {
      id: colorId,
      name,
    } = result.data;
    runInAction(() => {
      this.id = colorId;
      this.name = name;
    })
  }

  async getMany() {
    const result = await this.httpService.color.getMany({
      pagination: {
        skip: this.pagination.skip,
        take: this.pagination.take,
      },
    });
    runInAction(() => {
      this.pagination.setCount(result.data.count);
      this.count = result.data.count;
      this.fetchedColor = Array.from(result.data);
    })
  }

  async create() {
    const result = await this.httpService.color.create({
      name: this.name,
    });
    return result.data;
  }

  async update({
    name,
    colorId
  }) {
    await this.httpService.color.update({
      name,
      colorId: parseInt(colorId, 10),
    })
  }

  async delete({ colorId }) {
    const result = await this.httpService.color.delete({ colorId });
    if (result.status === 200) {
      runInAction(() => {
        this.fetchedColor = this.fetchedColor.filter(
          (color) => color.id !== result.data.id,
        )
      })
    }
  }
}