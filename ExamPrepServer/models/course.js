'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Course.hasMany(models.Enrollment, { as: 'enrollments', foreignKey: 'courseId'} )
    }
  }
  Course.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER, 
    courseCode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};