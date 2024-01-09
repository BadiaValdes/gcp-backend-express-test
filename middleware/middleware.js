const jwt = require('jwt-simple')
const moment = require('moment')

const ensureAuthenticated = function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Tu petición no tiene cabecera de autorización' })
  }

  const token = req.headers.authorization.split( ' ' )[ 1 ]
  console.log(jwt.decode( token, process.env.SEED_AUTENTICACION ))
  const payload = jwt.decode( token, process.env.SEED_AUTENTICACION )

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'El token ha expirado' })
  }

  req.user = payload.usuario
  next()
}

module.exports = { ensureAuthenticated }