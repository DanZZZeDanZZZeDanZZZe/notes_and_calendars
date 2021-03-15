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

  static async fetch(urlPart, method, data) {
    const url = `/${this.instance.base}/${urlPart}`

    const params = { headers: this.jsonContentHeader, method }
    if (method === 'POST' || method === 'PUT')
      params.body = JSON.stringify(data)

    return await fetch(url, params).then(async (res) => {
      if (!res.ok) {
        throw new Error(`Data retrieval error. Status: ${res.status}`)
      }
      return await res.json()
    })
  }
}

export default Fetcher
