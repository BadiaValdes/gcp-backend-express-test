const moongose = require('mongoose')

const userSchema = moongose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
    },
    apellido: {
      type: String,
      required: [true, 'El apellido es obligatorio'],
    },
    dni: {
      type: String,
      required: [true, 'El DNI es obligatorio'],
    },
    telefono: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      unique: [true, 'El email ya existe'],
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
    },
    roles: {
      type: String,
      enum: ['admin', 'user'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = moongose.model('User', userSchema)
