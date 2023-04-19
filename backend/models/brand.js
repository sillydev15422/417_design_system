'use strict';
// const 
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Brand.hasOne(models.Request, {
        foreignKey: "id"
      });
    }
  }
  Brand.init({
    name: DataTypes.STRING,
    industry: DataTypes.STRING,
    audience: DataTypes.STRING,
    webaddress: DataTypes.STRING,
    asset: DataTypes.STRING,
    description: DataTypes.STRING,
    colorcode: DataTypes.STRING,
    font: DataTypes.STRING
  }, {
    sequelize,
    timestamps: true,
    modelName: 'Brand'
  });
  return Brand;
};