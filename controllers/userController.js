const User = require('../models/userModel')
const { validateUser } = require('../schemas/userSchema')

const createUser = async (req, res) => {
  const result = validateUser(req.body)
  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  const user = new User({
    ...result.data,
  })
  await user.save()
  res.status(200).json({ message: 'Usuario creado correctamente' })
}

module.exports = { createUser }
