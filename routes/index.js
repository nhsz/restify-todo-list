const errors = require('restify-errors')
const Todo = require('../models/todo')

module.exports = (server) => {
  /*
    Method: POST
    Endpoint: /v1/todo/
    Usage: Create a new task
    Returns: new task
  */
  server.post('/v1/todo', (req, res, next) => {
    if (!req.is('application/json')) {
      return next(
        new errors.InvalidContentError("Expects 'application/json'")
      )
    }

    let data = req.body || {}

    let todo = new Todo(data)
    todo.save((err) => {
      if (err) {
        console.error(err)
        return next(
          new errors.InternalError(err.message)
        )
      }

      res.send(201, data)
      next()
    })
  })

  /*
    Method: GET
    Endpoint: /v1/todo/
    Usage: List all tasks
    Returns: TODO-list
  */
  server.get('/v1/todo', (req, res, next) => {
    Todo.apiQuery(req.params, (err, tasks) => {
      if (err) {
        console.error(err)
        return next(
          new errors.InvalidContentError(err.errors.name.message)
        )
      }

      res.send(200, tasks)
      next()
    })
  })

  /*
    Method: GET
    Endpoint: /v1/todo/{id}
    Usage: Get a specific task
    Returns: task
  */
  server.get('/v1/todo/:id', (req, res, next) => {
    Todo.findOne({ _id: req.params.id }, (err, task) => {
      if (err) {
        console.error(err)
        return next(
          new errors.InvalidContentError(err.errors.name.message)
        )
      }

      res.send(200, task)
      next()
    })
  })

  /*
    Method: PUT
    Endpoint: /v1/todo/{id}
    Usage: Update a specific task
    Returns: task
  */
  server.put('/v1/todo/:id', (req, res, next) => {
    if (!req.is('application/json')) {
      return next(
        new errors.InvalidContentError("Expects 'application/json'"),
      )
    }

    let data = req.body || {}

    if (!data._id) {
      data = Object.assign({}, data, { _id: req.params.id })
    }

    Todo.findOne({ _id: req.params.id }, (err, doc) => {
      if (err) {
        console.error(err)
        return next(
          new errors.InvalidContentError(err.errors.name.message)
        )
      } else if (!doc) {
        return next(
          new errors.ResourceNotFoundError(
            'The resource you requested could not be found.'
          )
        )
      }

      Todo.update({ _id: data._id }, data, (err) => {
        if (err) {
          console.error(err)
          return next(
            new errors.InvalidContentError(err.errors.name.message)
          )
        }

        res.send(200, data)
        next()
      })
    })
  })

  /*
    Method: DELETE
    Endpoint: /v1/todo/{id}
    Usage: Destroy a specific task
    Returns: task
  */
  server.del('/v1/todo/:id', (req, res, next) => {
    Todo.remove({ _id: req.params.id }, (err) => {
      if (err) {
        console.error(err)
        return next(
          new errors.InvalidContentError(err.errors.name.message)
        )
      }
      res.send(204)
      next()
    })
  })
}
