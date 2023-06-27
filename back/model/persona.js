const { Schema, model } = require('mongoose')


const PersonaSchema = Schema({
    documento: {
        type: Number,
        required: [true, 'El documento es obligatorio']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    nota1: {
        type: Number,
        required: [true, 'La nota1 es obligatoria']
    },
    nota2: {
        type: Number,
        required: [true, 'La nota2 es obligatoria']
    },
    nota3: {
        type: Number,
        required: [true, 'La nota3 es obligatoria']
    }
})

module.exports = model('Persona', PersonaSchema)