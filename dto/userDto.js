class UserDto {
  constructor(user) {
    this._id = user._id
    this.nombre = user.nombre
    this.apellido = user.apellido
    this.dni = user.dni
    this.telefono = user.telefono
    this.email = user.email
    this.roles = user.roles
  }
}

module.exports = UserDto
