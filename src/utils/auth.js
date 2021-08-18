import storage from "utils/storage";

class Auth {
  constructor(storage, authKey = "access_token") {
    this.storage = storage;
    this.authKey = authKey;
    this.accessToken = this.storage.getItem(this.authKey) || null;
  }

  isAuth() {
    return !!this.getToken();
  }

  getToken() {
    return this.accessToken;
  }

  setAccessToken(token) {
    this.accessToken = token;
    this.storage.setItem(this.authKey, token);
  }

  removeAccessToken() {
    this.accessToken = null;
    this.storage.removeItem(this.authKey);
  }
}

const auth = new Auth(storage);

export default auth;
