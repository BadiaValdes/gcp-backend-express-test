const UserDto = require('../dto/userDto')
const User = require('../models/userModel')
const { validateUser } = require( '../schemas/userSchema' )

const mysql = require('mysql')

const pool = mysql.createPool({
  user: "root",
  password: "TestSql",
  database: "testsql",
  socketPath: `/cloudsql/cdt-principal:us-central1:testsql`,
})

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

const getUsers = async (req, res) => {
  /*const users = await User.find({})

  const userDto = [...users].map((user) => new UserDto(user))

  res.status(200).send(userDto)*/

  const query = "Select * from test"
  pool.query(query, (err, result) => {
    console.log('IN HERE')
    console.log(result);
    res.status(200).json({
      data: result[0]
    })
  })
}

module.exports = { createUser, getUsers }
