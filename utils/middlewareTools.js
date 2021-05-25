const { compose } = require('compose-middleware')

exports.middlewareTools = () => ({
  composeMiddlewares(arr) {
    return compose(arr)
  },

  createMiddleware(logic) {
    return (req, res, next) => {
      try {
        logic(req, res, next)
      } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Something went wrong. Try it again!' })
      }
    }
  },
})
