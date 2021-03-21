class Fetcher {
  static instance
  static jsonContentHeader = { 'Content-Type': 'application/json' }

  constructor(apiBase) {
    if (Fetcher.instance) {
      return Fetcher.instance
    }
    this.base = apiBase
    Fetcher.instance = this
  }

  static init(apiBase) {
    new Fetcher(apiBase)
  }

  static async fetch({ urlPart, method, data, headers }) {
    const url = `/${this.instance.base}/${urlPart}`

    const params = {
      headers: new Headers({ ...this.jsonContentHeader, ...headers }),
      method,
    }
    if (method === 'POST' || method === 'PUT')
      params.body = JSON.stringify(data)
    const res = await fetch(url, params)
    const json = await res.json()

    if (!res.ok) {
      throw new Error(json.message)
    }

    return Promise.resolve(json)
  }
}

export default Fetcher
