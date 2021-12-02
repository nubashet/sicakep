const { User } = require('../models')
const Helper = require('../helper/Helper')
const { checkKanwil, checkRole, checkDivision } = require('../helper/global')

class UserController {
  static async login(req, res, next) {
    try {
      const { username, password } = req.body

      const user = await User.findOne({
        where: { username }
      })

      if (user) {
        const verified = Helper.compareSync(password, user.password)
        
        if (verified) {
          const sicakep_token = Helper.sign({ id: user.id, username: user.username, division: user.division, name: user.name, role: user.role, kanwil: user.kanwil })

          res.status(200).json({ sicakep_token })
        } else {
          next({ message: 'invalid username or password' })
        }
      } else {
        next({ message: 'invalid username or password' })
      }
    } catch(err) {
      next(err)
    }
  }

  static async getUsers(req, res, next) {
    try {
      const users = await User.findAll({
        where: { role: 'user' },
        order: [['name', 'ASC']],
        attributes: { exclude: ['password'] }
      })

      res.status(200).json(users)
    } catch(err) {
      next(err)
    }
  }

  static async addUser(req, res, next) {
    const { username, name, password, division, role, kanwil } = req.body
    try {
      const user = await User.create({ username: username.toLowerCase(), name, password, division: checkDivision[division], role: checkRole[role], kanwil: checkKanwil[kanwil] })

      res.status(201).json({ username: user.username, name: user.name, division: user.division })
    } catch(err) {
      next(err)
    }
  }
}

module.exports = UserController
