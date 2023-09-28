import { action, makeObservable, observable } from 'mobx';

export default class CartStore {
  items = []
  isClosed = true

  constructor() {
    makeObservable(this, {
      items: observable,
      isClosed: observable,
      addItem: action,
      removeItem: action,
      openCart: action,
      closeCart: action,
    })
    // console.log('here', this.items)
  }

  addItem(item) {
    this.items.push(item)
    console.log(this.items)
  }

  removeItem(index) {
    this.items.splice(index, 1)
  }

  openCart() {
    this.isClosed = false;
  }

  closeCart() {
    this.isClosed = true;
  }

} 