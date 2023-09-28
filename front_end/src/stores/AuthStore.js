import { action, makeObservable, observable } from "mobx";

class AuthStore {
  user = null;

  httpService = null;

  constructor(httpService) {
    this.httpService = httpService
    makeObservable(this, {
      user: observable,
      login: action,
      register: action,
    })
  }

  async login({ email, password }) {
    const result = await this.httpService.auth.login({ email, password });
    this.user = result.data
    return this.user
  }

  async register({ name, email, password }) {
    const result = await this.httpService.auth.register({ name, email, password });
    this.user = result.data
    return this.user
  }
}

export default AuthStore