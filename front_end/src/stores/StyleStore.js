import { action, makeObservable, observable, runInAction } from 'mobx';
import Pagination from './PaginationStore';

export default class StyleStore {
  id = null;

  name = null;

  fetchedStyle = [];

  count = null;

  httpService;

  pagination = new Pagination(1);

  constructor(httpService) {
    this.httpService = httpService;
    makeObservable(this, {
      id: observable,
      name: observable,
      fetchedStyle: observable,
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
    const result = await this.httpService.style.get({ id });
    const {
      id: styleId,
      name,
    } = result.data;
    runInAction(() => {
      this.id = styleId;
      this.name = name;
    })
  }

  async getMany() {
    const result = await this.httpService.style.getMany({
      pagination: {
        skip: this.pagination.skip,
        take: this.pagination.take,
      },
    });
    runInAction(() => {
      this.pagination.setCount(result.data.count);
      this.count = result.data.count;
      this.fetchedStyle = Array.from(result.data);
    })
  }

  async create() {
    const result = await this.httpService.style.create({
      name: this.name,
    });
    return result.data;
  }

  async update({
    name,
    styleId
  }) {
    await this.httpService.style.update({
      name,
      styleId: parseInt(styleId, 10),
    })
  }

  async delete({ styleId }) {
    const result = await this.httpService.style.delete({ styleId });
    if (result.status === 200) {
      runInAction(() => {
        this.fetchedStyle = this.fetchedStyle.filter(
          (style) => style.id !== result.data.id,
        )
      })
    }
  }
}