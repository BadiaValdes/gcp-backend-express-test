const z = require('zod')

const loginSchema = z.object({
  email: z
    .string({
      required_error: 'El email es obligatorio',
      invalid_type_error: 'El email debe ser un string',
    })
    .email('Debe ser un email válido'),
  password: z.string({
    required_error: 'La contraseña es obligatoria',
    invalid_type_error: 'La contraseña debe ser un string',
  }),
})

function validateLogin(object) {
  return loginSchema.safeParse(object)
}

module.exports = { validateLogin }
