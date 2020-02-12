const express = require('express')
const router = express.Router()

const Coaster = require('../models/coaster.model')
const Park = require('../models/park.model')

// Aquí los endpoints

router.get('/', (req, res) => Coaster.find()
    .populate('park')
    .then(coasters => res.render('coasters/coasters-index', {
        coasters: coasters
    })).catch(err => console.log(`Error al buscar coaster ${err}`)))

router.get('/new', (req, res) => Coaster.find()
    .populate('park')
    .then(coasters => Park.find()
        .then(parks => res.render('coasters/new-coaster', {
            coasters: coasters,
            parks: parks
        })))
    .catch(err => console.log(`Error al buscar coaster ${err}`)))

router.post('/new', (req, res) => Coaster.create(req.body)
    .then(() => res.redirect('/coasters'))
    .catch(err => console.log(`Error al crear coaster ${err}`)))

router.get('/edit', (req, res) =>
    Coaster.findById(req.query.id)
    .then(coaster => Park.find()
        .then(parks => res.render('coasters/edit-coaster', {
            coaster: coaster,
            parks: parks
        })))
    .catch(err => console.log(`Error al buscar coaster ${err}`)))

router.post('/edit', (req, res) => {
    console.log(req.query.id, req.body)
    Coaster.findByIdAndUpdate(req.query.id, req.body)
        .then(() => res.redirect('/coasters'))
        .catch(err => console.log(err => console.log(`Error al editar el parque ${err}`)))
})


router.get('/delete/:id', (req, res) => Coaster.findByIdAndDelete(req.params.id).then(() => res.redirect('/coasters')).catch(err => console.log(`Error al eliminar coaster ${err}`)))

router.get('/:id', (req, res) => Coaster.findById(req.params.id).populate('park').then(coaster => res.render('coasters/coaster-details', coaster)).catch(err => console.log(`Error al buscar coaster ${err}`)))

module.exports = router