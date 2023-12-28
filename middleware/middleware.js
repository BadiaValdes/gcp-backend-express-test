var jwt = require('jwt-simple')
var moment = require('moment')

const ensureAuthenticated = function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Tu petición no tiene cabecera de autorización' })
  }

  var token = req.headers.authorization.split( ' ' )[ 1 ]
  console.log(token)
  var payload = jwt.decode( token, process.env.SEED_AUTENTICACION )

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'El token ha expirado' })
  }

  req.user = payload.usuario
  console.log(req.user)
  console.log(payload.usuario)
  next()
}

module.exports = { ensureAuthenticated }