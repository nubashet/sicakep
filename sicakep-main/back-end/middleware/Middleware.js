const Helper = require('../helper/Helper')
const { User } = require('../models')
const { checkRole } = require('../helper/global')

class Middleware {
  static authentication(req, res, next) {
    if (req.headers.sicakep_token) {
      try {
        const userData = Helper.verify(req.headers.sicakep_token)

        User.findOne({
          where: { username: userData.username }
        })
          .then((data) => {
            req.user = { id: data.id, username: data.username, role: data.role, division: data.division, kanwil: data.kanwil }
            next()
          })
      } catch(err) {
        next({ errorCode: 'FORBIDDEN' })
      }
    } else {
      next({ errorCode: 'FORBIDDEN' })
    }
  }

  static adminAuthorization(req, res, next) {
    const userData = Helper.verify(req.headers.sicakep_token)

    if (userData.role == checkRole.admin || userData.role == checkRole.superadmin) {
      next()
    } else {
      next({ errorCode: 'FORBIDDEN' })
    }
  }

  static supervisorAndAdminAuthorization(req, res, next) {
    const userData = Helper.verify(req.headers.sicakep_token)

    if (userData.role == checkRole.admin || userData.role == checkRole.superadmin || userData.role == checkRole.supervisor) {
      next()
    } else {
      next({ errorCode: 'FORBIDDEN' })
    }
  }

  static superAdminAuthorization(req, res, next) {
    const userData = Helper.verify(req.headers.sicakep_token)

    if (userData.role == checkRole.superadmin) {
      next()
    } else {
      next({ errorCode: 'FORBIDDEN' })
    }
  }

  static errorHandler(err, req, res, next) {
    let errorCode = 'INTERNAL_SERVER_ERROR'
    let message = 'internal server error'
    let status = 500
    console.log(err)
    if (err.message == 'invalid username or password') {
      errorCode = 'NOT_FOUND'
      message = err.message
      status = 404
    } else if (err.name == 'SequelizeValidationError') {
      const errors = []

      err.errors.forEach(element => {
          errors.push(element.message)
      });

      errorCode = 'BAD_REQUEST'
      message = errors.join(', ')
      status = 400
    } else if (err.errorCode == 'FORBIDDEN') {
      errorCode = err.errorCode
      message = 'authentication/authorization failed'
      status = 401
    } else if (err.errorCode == 'NOT_FOUND') {
      errorCode = err.errorCode
      message = 'data not found'
      status = 404
    }

    return res.status(status).json({ message, errorCode })
  }
}

module.exports = Middleware
