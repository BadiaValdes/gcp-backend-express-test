const express = require('express')
const router = express.Router()
const { createUser, getUsers } = require('../controllers/userController')
const { ensureAuthenticated } = require('../middleware/middleware')

/*router.post( '/users', ensureAuthenticated, ( req, res ) =>
{
  if(req.user.roles !== 'admin')
  {
    return res.status(403).send('No autorizado')
  }
  return createUser(req, res)
} )

router.get( '/users', ensureAuthenticated, ( req, res ) =>
{
  if(req.user.roles !== 'admin')
  {
    return res.status(403).send('No autorizado')
  }
  return getUsers(req, res)
})*/

router.get('/users', getUsers)

module.exports = router
