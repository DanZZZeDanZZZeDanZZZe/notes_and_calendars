const { compose } = require('compose-middleware')

const composeMiddlewares = (arr) => compose(arr)

module.exports = composeMiddlewares
