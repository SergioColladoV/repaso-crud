const express = require('express')
const router = express.Router()

const Park = require('../models/park.model')

// Aquí los endpoints

router.get('/', (req, res) => Park.find()
    .then(parks => res.render('parks/parks-index', {
        parks: parks
    })).catch(err => console.log(`Error al buscar park ${err}`)))

router.get('/new', (req, res) => res.render('parks/new-park'))

router.post('/new', (req, res) => Park.create(req.body).then(() => res.redirect('/parks')).catch(err => `Error al crear parque ${err}`))

router.get('/delete/:id', (req, res) => Park.findByIdAndDelete(req.params.id).then(() => res.redirect('/parks')).catch(err => `Error al borrar parque ${err}`))

router.get('/edit/:id', (req, res) => Park.findById(req.params.id).then(park => res.render('parks/edit-park', park)).catch(err => `Error al buscar parque ${err}`))

router.post('/edit/:id', (req, res) => Park.findByIdAndUpdate(req.params.id, req.body).then(park => res.redirect('/parks')).catch(err => `Error al editar parque ${err}`))

module.exports = router