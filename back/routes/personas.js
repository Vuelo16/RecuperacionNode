const { Router } = require('express')

const route = Router()

const { getPersona, postPersona, putPersona, deletePersona } = require('../controllers/persona')

route.get('/', getPersona)

route.post('/', postPersona)

route.put('/', putPersona)

route.delete('/', deletePersona)

module.exports = route