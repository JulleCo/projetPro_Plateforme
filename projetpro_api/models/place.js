"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Place extends Model {
    static associate(models) {
      models.Place.belongsTo(models.User, {
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  Place.init(
    {
      type: DataTypes.STRING,
      location: DataTypes.STRING,
      animaux: DataTypes.STRING,
      personMax: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
      picture: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Place",
    }
  );
  return Place;
};
