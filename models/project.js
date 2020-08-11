'use strict';
module.exports = (sequelize, DataTypes) => {
  const project = sequelize.define('project', {
    name: DataTypes.STRING,
    // validates if string is url
    githubLink: {
      type: DataTypes.TEXT,
      validate: {
        isUrl: true
      }
    },
    deployLink: {
      type: DataTypes.TEXT,
      validate: {
        isUrl: true
      }
    },
    description: DataTypes.TEXT
  }, {})

  project.associate = function(models) {
    // associations can be defined here
  }

  return project
}
