import { STORAGE_KEY } from "constants/common";

class Storage {
  constructor(prefix) {
    this.prefix = prefix;
  }

  getStorageKey = (key) => `${this.prefix}.${key}`;

  getItem = (key) => localStorage.getItem(this.getStorageKey(key));

  setItem = (key, value) =>
    localStorage.setItem(this.getStorageKey(key), value);

  removeItem = (key) => localStorage.removeItem(this.getStorageKey(key));

  getJson = (key) => {
    const value = this.getItem(key);
    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  };

  setJson = (key, value) => this.setItem(key, JSON.stringify(value));
}

const storage = new Storage(STORAGE_KEY);

export default storage;
