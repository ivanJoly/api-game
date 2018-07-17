'use strict'

const Game = require('../models/game')

function saveGame(req, res) {

    let game = new Game()
    game.name = req.body.name
    game.picture = req.body.picture
    game.description = req.body.description

    game.save((err, gameStore) => {
        if (err) res.status(500).send({ message: 'Error al salvar en la base de datos', err })

        res.status(200).send({ game: gameStore })
    })
}

function getGames(req, res) {
    Game.find({}, (err, games) => {
        if (err) return res.status(500).send({ message: 'Error al realizar la peticion', err })
        if (!games) return res.status(404).send({ message: 'No existen productos' })

        res.status(200).send({games})
    })
}

module.exports = {
    saveGame,
    getGames
}