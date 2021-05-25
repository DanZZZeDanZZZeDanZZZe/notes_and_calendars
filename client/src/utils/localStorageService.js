const storage = window.localStorage

const localStorageService = {
  getItem(name) {
    return JSON.parse(storage.getItem(name))
  },

  setItem(name, value) {
    storage.setItem(name, JSON.stringify(value))
  },

  removeItem(name) {
    storage.removeItem(name)
  },

  getItems(arr) {
    return arr.reduce(
      (acc, name) => ({ ...acc, [name]: this.getItem(name) }),
      {}
    )
  },

  setItems(arr) {
    arr.forEach(([name, value]) => this.setItem(name, value))
  },

  removeItems(arr) {
    arr.forEach((name) => this.removeItem(name))
  },
}

export default localStorageService
