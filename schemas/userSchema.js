const z = require('zod')

const userSchema = z.object({
  nombre: z.string({
    required_error: 'El nombre es obligatorio',
    invalid_type_error: 'El nombre debe ser un string',
  }),
  apellido: z.string({
    required_error: 'El apellido es obligatorio',
    invalid_type_error: 'El apellido debe ser un string',
  }),
  dni: z.string({
    required_error: 'El DNI es obligatorio',
    invalid_type_error: 'El DNI debe ser un string',
  }),
  telefono: z.string().optional(),
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
  roles: z.nativeEnum(['admin', 'user'], {
    errorMap: (issue, _ctx) => {
      switch (issue.code) {
        case 'invalid_type':
          return { message: 'Los roles deben ser admin o user' };
        case 'invalid_enum_value':
          return { message: 'Los roles deben ser un array de string' };
        default:
          return { message: 'Los roles son obligatorios' };
      }
    },
  }),
})

function validateUser(object) {
  return userSchema.safeParse(object)
}

module.exports = { validateUser }