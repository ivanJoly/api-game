'use strict'

const User = require('../models/user')
const service = require('../services')

function signUp(req, res) {
    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName,
        password: req.body.password
    })
    user.save((err) => {
        if (err) return res.status(500).send({ message: 'Error al crear el usuario', err })

        return res.status(200).send({ message: 'Registrado satisfactoriamente', token: service.createToken(user) })
    })
}

const signIn = (req, res) => {

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
        if (!user) return res.status(404).send({ msg: `no existe el usuario: ${req.body.email}` })

        return user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
            if (!isMatch) return res.status(404).send({ msg: `Error de contraseña: ${req.body.email}` })

            req.user = user
            return res.status(200).send({ msg: 'Te has logueado correctamente', token: service.createToken(user) })
        });

    }).select('_id email +password');
}

function getUsers(req, res) {
    User.find({}, (err, users) => {
        if (err) return res.status(500).send({ message: 'Error al realizar la peticion', err })
        if (!users) return res.status(404).send({ message: 'No existen usuarios' })

        res.status(200).send({ users: users })
    })
}

function deleteUser(req, res) {
    let userId = req.params.userId

    User.findByIdAndRemove(userId, (err, user) => {
        if (err) return res.status(500).send({ message: 'Error al realizar la peticion', err })
        if (!user) return res.status(404).send({ message: 'Ese usuario no existe' })

        res.status(200).send({message:'Usuario eliminado', user: userId})
    })
}

module.exports = {
    signIn,
    signUp,
    getUsers,
    deleteUser
}