const mongoose = require('mongoose');
const bcrypt = require('bcrypt-node');

const userSchema = new mongoose.Schema({ 
    local: {
        email: String,
        nickname: String,
        password: String
      }
});

//cifra la constraseña y aplicar un algoritmo para convertir el pass 8 veces
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);    
};

//compara la contraseña que ingresa vs la cifrada en la BD
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

// exportamos el modelo
module.exports = mongoose.model('User', userSchema);