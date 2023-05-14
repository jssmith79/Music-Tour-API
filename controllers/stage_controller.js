const stage = require('express').Router();
const db = require('../models')
const { Stage } = db
const { Op } = require('sequelize')

//find all stages

stage.get('/', async (req, res) => {
    try {
        const foundStages = await Stage.findAll({
            order: [['available_start_time', 'ASC']],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name: ''}%`}
            }
        })
        res.status(200).json(foundStages)
    } catch (error) {
        res.status(500).json(error)
    }
})

//find any stage
stage.get('/:name', async (req, res) => {
    try {
        const foundStages = await Stage.findOne({
            where: { stage_id: req.params.id }
        })
        res.status(200).json(foundStages);
    } catch (error) {
        res.status(500).json(error);
    }
})

stage.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body);
        res.status(200).json({
            mesage: 'Successfully inserted a new stage.',
            data: newStage
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

stage.put('/:name', async (req, res) => {
    try {
        const updatedStages = await Stage.update(req.body, {
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            messsage: `Successfully updated ${updatedStages} stages`
        })
    } catch (err) {
        res.status(500).json(err)

    }
})

//delete a stage

stage.delete('/:name', async (req, res) => {
    try {
        const deletedStage = await Stage.destroy({
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `successfully deleted ${deletedStage} stage`
        })
    } catch(err){
        res.status(500).json(err)
    }
})
module.exports = stage;