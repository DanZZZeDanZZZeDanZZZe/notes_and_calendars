class LocalStorageService {
  constructor() {
    this.storage = window.localStorage
  }

  getItem(name) {
    return JSON.parse(this.storage.getItem(name))
  }

  setItem(name, value) {
    this.storage.setItem(name, JSON.stringify(value))
  }

  removeItem(name) {
    this.storage.removeItem(name)
  }

  getItems(arr) {
    return arr.reduce(
      (acc, name) => ({ ...acc, [name]: this.getItem(name) }),
      {}
    )
  }

  setItems(arr) {
    arr.forEach(([name, value]) => this.setItem(name, value))
  }

  removeItems(arr) {
    arr.forEach((name) => this.removeItem(name))
  }
}

export default LocalStorageService
