'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Upload extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Upload.init({
    realname: DataTypes.STRING,
    fakename: DataTypes.STRING,
    owner: DataTypes.INTEGER,
    type: DataTypes.STRING,
  }, {
    sequelize,
    timestamps: true,
    modelName: 'Upload',
  });
  return Upload;
};