const bands = require('express').Router();
const db = require('../models')
const { Band, meet_greet, event, set_time } = db
const { Op } = require('sequelize')

//find all bands

bands.get('/:name', async (req, res) => {
    try {
        const foundBands = await Band.findAll({
            include: [ 
                { 
                    model: meet_greet, 
                    as: "meet_greets",
                    include: { 
                        model: Event, 
                        as: "event",
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } }
                    } 
                },
                { 
                    model: set_time,
                    as: "set_times",
                    include: { 
                        model: Event, 
                        as: "event",
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } }
                    }
                }
            ] 
        })
        res.status(200).json(foundBands)
    } catch (error) {
        res.status(500).json(error)
    }
})

//find any band
bands.get('/:name', async (req, res) => {
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
    } catch (err) {
        res.status(500).json(err);
    }
})

bands.put('/:name', async (req, res) => {
    try {
        const updatedBands = await Band.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            messsage: `Successfully updated ${updatedBands} bands`
        })
    } catch (err) {
        res.status(500).json(err)

    }
})

//delete a band

bands.delete('/:name', async (req, res) => {
    try {
        const deletedBands = await Band.destroy({
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `successfully deleted ${deletedBands} band`
        })
    } catch(err){
        res.status(500).json(err)
    }
})
module.exports = bands;