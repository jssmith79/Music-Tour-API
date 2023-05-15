'use strict';
const {
  Model
} = require('sequelize');
const event = require('./event');
module.exports = (sequelize, DataTypes) => {
  class Meet_greet extends Model {
    static associate({ Band, Event }) {
      // band
      Meet_greet.belongsTo(Band, {
        foreignKey: "band_id",
        as: "band"
      })
      //event
      Meet_greet.belongsTo(Event, {
        foreignKey: "event_id",
        as: "event"
      })
    }
  }
  Meet_greet.init({
    event_id: {
      type: DataTypes.INTEGER,
      secondaryKey: true,
      allowNull: false
    },
    band_id: {
      type: DataTypes.INTEGER,
      secondaryKey: true,
      allowNull: false
    },
    meet_start_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    meet_end_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    meet_greet_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Meet_greet',
    tableName: 'meet_greets',
    timestamps: false
  });
  return Meet_greet;
};