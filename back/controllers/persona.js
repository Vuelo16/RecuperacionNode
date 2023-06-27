const { response } = require('express')
const Persona = require('../model/persona')

const getPersona = async (req, res = response) => {
    let mensaje = ''
    try {
     
        const personas = await Persona.find()
        mensaje = personas
    } catch (error) {
        mensaje = error
    }

    res.json({
        personas:mensaje
    })
}

const postPersona = async (req, res = response) => {

    const body = req.body
    let mensaje = ''
    console.log('Ingresa')
    const persona = new Persona(body) 
    console.log(body)
    
    try {
        await persona.save()
        mensaje = 'Persona registrada exitosamente'
    } catch (error) {
        mensaje = error
    }

    res.json({
        mensaje
    })
}

const putPersona = async (req, res = response) => {
    const body = req.body
    console.log(body)

    let mensaje = ''
    try {
        if(body.tipoModificacion == 'Unitaria'){
        await Persona.findOneAndUpdate({ _id:body._id},{documento:body.documento, nombre:body.nombre, nota1:body.nota1, nota2:body.nota2 , nota3:body.nota3})
        mensaje = 'Modificacado exitosamente, modificacion unitaria'
    }
    else{
        await Persona.updateMany({ _id:body._id},{documento:body.documento, nombre:body.nombre, nota1:body.nota1, nota2:body.nota2 , nota3:body.nota3})
        mensaje = 'Modificacado exitosamente, modificacion multiple'
    }
    } catch (error) {
        mensaje = error
    }
    res.json({
        mensaje:mensaje
    })
}

const deletePersona = async(req, res = response) => {
    const body = req.body
    let mensaje = ''

    try{
        await Persona.deleteOne({_id:body._id})
        mensaje = 'Eliminación exitosa'
    }catch(error){
        mensaje = error
    }
    res.json({
        mensaje
    })
}
module.exports = {
    getPersona,
    postPersona,
    putPersona,
    deletePersona
}