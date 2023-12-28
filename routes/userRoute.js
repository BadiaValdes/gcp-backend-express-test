const express = require('express')
const router = express.Router()
const { createUser } = require('../controllers/userController')
const { ensureAuthenticated } = require('../middleware/middleware')

router.post( '/users', ensureAuthenticated, ( req, res ) =>
{
  console.log( req.user )
  console.log( req.user.roles )
  console.log( req.user.roles === 'admin')
  if(req.user.roles !== 'admin')
  {
    return res.status(403).send('No autorizado')
  }
  return createUser(req, res)
})

module.exports = router
