import Fetcher from './Fetcher'

class HTTPMethodsHandler extends Fetcher {
  static async get(urlPart, headers) {
    return await HTTPMethodsHandler.fetch({ urlPart, method: 'GET', headers })
  }

  static async getWithAuthToken(urlPart, token) {
    const headers = {
      Authorization: token,
    }

    return await this.get(urlPart, headers)
  }

  static async delete(urlPart) {
    return await HTTPMethodsHandler.fetch({ urlPart, method: 'DELETE' })
  }

  static async post(urlPart, data) {
    return await HTTPMethodsHandler.fetch({ urlPart, method: 'POST', data })
  }

  static async put(urlPart, data) {
    return await HTTPMethodsHandler.fetch({ urlPart, method: 'PUT', data })
  }
}

export default HTTPMethodsHandler
