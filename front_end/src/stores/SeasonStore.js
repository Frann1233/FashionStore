import { action, makeObservable, observable, runInAction } from 'mobx';
import Pagination from './PaginationStore';

export default class SeasonsStore {
  id = null;

  name = null;

  fetchedSeason = [];

  count = null;

  httpService;

  pagination = new Pagination(1);

  constructor(httpService) {
    this.httpService = httpService;
    makeObservable(this, {
      id: observable,
      name: observable,
      fetchedSeason: observable,
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
    const result = await this.httpService.season.get({ id });
    const {
      id: seasonId,
      name,
    } = result.data;
    runInAction(() => {
      this.id = seasonId;
      this.name = name;
    })
  }

  async getMany() {
    const result = await this.httpService.season.getMany({
      pagination: {
        skip: this.pagination.skip,
        take: this.pagination.take,
      },
    });
    runInAction(() => {
      this.pagination.setCount(result.data.count);
      this.count = result.data.count;
      this.fetchedSeason = Array.from(result.data);
    })
  }

  async create() {
    const result = await this.httpService.season.create({
      name: this.name,
    });
    return result.data;
  }

  async update({
    name,
    seasonId
  }) {
    await this.httpService.season.update({
      name,
      seasonId: parseInt(seasonId, 10),
    })
  }

  async delete({ seasonId }) {
    const result = await this.httpService.season.delete({ seasonId });
    if (result.status === 200) {
      runInAction(() => {
        this.fetchedSeason = this.fetchedSeason.filter(
          (season) => season.id !== result.data.id,
        )
      })
    }
  }
}