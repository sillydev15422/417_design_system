'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Request.hasOne(models.Brand, {
        foreignKey: "brand"
      });
    }
  }
  Request.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    brand: DataTypes.INTEGER,
    description: DataTypes.STRING,
    textdesign: DataTypes.STRING,
    size: DataTypes.STRING,
    preferType:  DataTypes.STRING,
    priority:  DataTypes.STRING,
    asset: DataTypes.STRING,
    example: DataTypes.STRING,
    collaborator: DataTypes.STRING, 
  }, {
    sequelize,
    timestamps: true,
    modelName: 'Request'
  });
  return Request;
};