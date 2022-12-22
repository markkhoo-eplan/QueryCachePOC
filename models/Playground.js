const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Playground extends Model {}

Playground.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    strings: {
      type: DataTypes.CHAR(255),
      allowNull: true,
    }
  }, {
    sequelize,
    timestamps: false,
    freezeTableName: true, // If true then sequelize does not appends 's' character after table name.
    underscored: true,
    modelname: 'playground'
  }
);

module.exports = Playground;