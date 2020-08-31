const liittymatRouter = require('express').Router()
const Liittyma = require('../models/liittyma')
const logger = require('../utils/logger')

liittymatRouter.get('/', async (req, res) => {
    try {
        const liittymat = await Liittyma.find({})
        res.json(liittymat.map(liittyma => liittyma.toJSON()))
      } catch (error ) {
        logger.error('error fetching liittymat from database', error.message)
      }
} )

liittymatRouter.post('/', async (req, res) => {
    try {
        const body = req.body

        const liittyma = new Liittyma({
            operaattori: body.operaattori,
            nimi: body.nimi,
            puhe: body.puhe,
            viestit: body.viestit,
            netti: body.netti,
            rajaton: body.rajaton,
            eu: body.eu,
            hinta: body.hinta,
        })

        const saveLiittyma = await liittyma.save()

        res.json(saveLiittyma.toJSON())
        
    } catch (error) {
        logger.error('error adding liittyma to database: ', error.message)
    }

})

module.exports = liittymatRouter