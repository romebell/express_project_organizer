'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
            //with joins table they have belongsTo name and pass which each one are then make the assocation

      models.category.belongsToMany(models.project, 
        {through: 'categories_projects', onDelete: 'CASCADE'})
    }
  };
  category.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'category',
  });
  return category;
};