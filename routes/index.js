'use strict'

const express = require('express');

const gameCtrl = require('../controllers/game');
const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');
const api = express.Router();

api.get('/', function(req, res){
    res.status(200).send({message: 'Funciona correctamente!'});
})

api.get('/users', userCtrl.getUsers);
api.get('/games', gameCtrl.getGames);
api.get('/auth', auth, function(req, res){
    res.status(200).send({ message: 'Acceso autorizado'})
})
api.post('/signup', userCtrl.signUp);
api.delete('/user/:userId', userCtrl.deleteUser)

module.exports =  api