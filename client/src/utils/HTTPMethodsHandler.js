import Fetcher from './Fetcher'

class HTTPMethodsHandler extends Fetcher {
  static async get(urlPart) {
    return await HTTPMethodsHandler.fetch(urlPart, 'GET')
  }

  static async delete(urlPart) {
    return await HTTPMethodsHandler.fetch(urlPart, 'DELETE')
  }

  static async post(urlPart, data) {
    return await HTTPMethodsHandler.fetch(urlPart, 'POST', data)
  }

  static async put(urlPart, data) {
    return await HTTPMethodsHandler.fetch(urlPart, 'PUT', data)
  }
}

export default HTTPMethodsHandler
