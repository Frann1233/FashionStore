import { createContext, useContext } from 'react';
import BrandStore from './BrandStore';
import CategoryStore from './CategoryStore';
import ColorStore from './ColorStore';
import MaterialStore from './MaterialStore';
import ProductStore from './ProductStore';
import SeasonStore from './SeasonStore';
import SizeStore from './SizeStore';
import SortStore from './SortStore';
import StyleStore from './StyleStore';
import TypeStore from './TypeStore';
import AuthStore from './AuthStore';
import CartStore from './CartStore';
import HttpService from '../common/HttpService';

const httpService = new HttpService();

const store = {
  brandStore: new BrandStore(httpService),
  categoryStore: new CategoryStore(httpService),
  colorStore: new ColorStore(httpService),
  materialStore: new MaterialStore(httpService),
  productStore: new ProductStore(httpService),
  seasonStore: new SeasonStore(httpService),
  sizeStore: new SizeStore(httpService),
  styleStore: new StyleStore(httpService),
  typeStore: new TypeStore(httpService),
  authStore: new AuthStore(httpService),
  cartStore: new CartStore(),
}

const componentStore = {
  sortStore: new SortStore(),
}

const StoreContext = createContext(store);
const ComponentContext = createContext(componentStore);

export const useStore = () => useContext(StoreContext);
export const useComponentStore = () => useContext(ComponentContext);

export default {
  store,
  componentStore,
}