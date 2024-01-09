const User = require( '../models/userModel' )
const UserDto = require('../dto/userDto')
const jwt = require('jsonwebtoken')
const { validateLogin } = require('../schemas/loginSchema')

const login = async (req, res) => {
  const result = validateLogin(req.body)
  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  const body = req.body
  User.findOne({ email: body.email })
    .then((user) => {
      if (user) {
        
        if (user.password === body.password) {
          const usuario = new UserDto(user)
          let token = jwt.sign({ usuario: usuario }, process.env.SEED_AUTENTICACION, {
            expiresIn: process.env.CADUCIDAD_TOKEN,
          })
          return res.json({
            message: "Login correcto",
            usuario: usuario,
            token,
          })
        }
      } else {
        return res.status(400).json({
          err: {
            message: 'Usuario o contraseña incorrectos',
          },
        })
      }
    })
    .catch((err) => {
      if (err) {
        return res.status(500).json({
          err,
        })
      }
    })
}

module.exports = { login }
