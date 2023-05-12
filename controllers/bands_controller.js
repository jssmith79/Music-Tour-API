const bands = require('express').Router();
const db = require('../models')
const { Band } = db

//find all bands

bands.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll()
        res.status(200).json(foundBands)
    } catch (error) {
        res.status(500).json(error)
    }
})

//find any band
bands.get('/:id', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: { band_id: req.params.id }
        })
        res.status(200).json(foundBand);
    } catch (error) {
        res.status(500).json(error);
    }
})

bands.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body);
        res.status(200).json({
            mesage: 'Successfully inserted a new band.',
            data: newBand
        });
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports = bands;