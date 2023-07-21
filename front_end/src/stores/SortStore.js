import { action, makeObservable, observable, runInAction } from 'mobx';

class SortStore {
  asc = false;
  sortBy = 'Name';
  sortOptions = [
    { value: 'Name', label: 'Name' },
    { value: 'Price', label: 'Price' },
    { value: 'Type', label: 'Type' },
    { value: 'Category', label: 'Category' },
    { value: 'Brand', label: 'Brand' },
    { value: 'Material', label: 'Material' },
    { value: 'Style', label: 'Style' },
    { value: 'Season', label: 'Season' },
    { value: 'Size', label: 'Size' },
    { value: 'Color', label: 'Color' },
  ];

  constructor() {
    makeObservable(this, {
      asc: observable,
      sortBy: observable,
      sortOptions: observable,
      setAsc: action,
      setSortBy: action,
    });
  }

  setAsc(boolean) {
    this.asc = boolean;
  }

  setSortBy(value) {
    runInAction(() => {
      this.sortBy = value;
    });
  }
}

export default SortStore;
