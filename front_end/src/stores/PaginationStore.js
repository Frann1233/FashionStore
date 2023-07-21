import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import Consts from '../common/Consts';

export default class Pagination {
  skip = Consts.DEFAULT_PAGINATION_SKIP;

  take = Consts.DEFAULT_PAGINATION_TAKE;

  count = 0;

  constructor(take = undefined) {
    // eslint-disable-next-line no-unused-expressions
    if (take) {
      this.take = take;
    }
    makeObservable(this, {
      count: observable,
      skip: observable,
      take: observable,
      nextPage: action,
      previousPage: action,
      setCount: action,
      currentLastIndex: computed,
    });
  }

  nextPage() {
    if (this.count >= this.skip + this.take) {
      this.skip += this.take;
    }
  }

  previousPage() {
    if (this.skip - this.take >= 0) {
      this.skip -= this.take;
    }
  }

  get currentLastIndex() {
    return this.skip + this.take;
  }

  setCount(count) {
    this.count = count;
  }
}
