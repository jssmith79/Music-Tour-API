'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Band extends Model {
        // meet greet  times
        static associate({ Meet_greet, Set_time }) {
            Band.hasMany(Meet_greet, {
                foreignKey: "band_id",
                as: "meet_greets"
            })
            // set times
            Band.hasMany(Set_time, {
                foreignKey: "band_id",
                set_time: "set_times"
            })
        }
    }
    Band.init({
        band_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genre: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        available_start_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_time: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Band',
        tableName: 'bands',
        timestamps: false
    });

    return Band;
};