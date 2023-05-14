const event = require('express').Router();
const db = require('../models')
const { Event } = db
const { Op } = require('sequelize')

//find all events

event.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [['available_start_time', 'ASC']],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name: ''}%`}
            }
        })
        res.status(200).json(foundEvents)
    } catch (error) {
        res.status(500).json(error)
    }
})

//find any event
event.get('/:name', async (req, res) => {
    try {
        const foundEvents = await Event.findOne({
            where: { event_id: req.params.id }
        })
        res.status(200).json(foundEvents);
    } catch (error) {
        res.status(500).json(error);
    }
})

event.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body);
        res.status(200).json({
            mesage: 'Successfully inserted a new event.',
            data: newEvent
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

event.put('/:name', async (req, res) => {
    try {
        const updatedEvent = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            messsage: `Successfully updated ${updatedEvent} events`
        })
    } catch (err) {
        res.status(500).json(err)

    }
})

//delete a event

event.delete('/:name', async (req, res) => {
    try {
        const deletedEvent = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `successfully deleted ${deletedEvent} event`
        })
    } catch(err){
        res.status(500).json(err)
    }
})
module.exports = event;