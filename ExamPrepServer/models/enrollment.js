'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Enrollment.belongsTo(models.Course, { as: 'course', foreignKey: 'courseId' }), 
      models.Enrollment.belongsTo(models.User, { as: 'user', foreignKey: 'userId' })
    }
  };
  Enrollment.init({
    userId: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER,
    enrollmentDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Enrollment',
  });
  return Enrollment;
};