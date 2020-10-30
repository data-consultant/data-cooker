// const User = require('./user');

const tableName = 'Courses';

module.exports = function (sequelize, DataTypes) {
	const Course = sequelize.define('Course', {
		// id: {
		// 	type: DataTypes.INTEGER,
		// 	primaryKey: true,
		// 	autoIncrement: true,
		// },
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: {
					msg: 'Title is required',
				},
				notNull: {
					msg: 'Must contain a Title property',
				},
			},
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: {
					msg: 'Description is required',
				},
				notNull: {
					msg: 'Must contain a description property',
				},
			},
		},
		estimatedTime: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		materialsNeeded: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	}, { tableName });

	Course.associate = (models) => {
		//Course' belongs to a single User
		Course.belongsTo(models.User, {
			as: 'course',
			foreignKey: {
				fieldName: 'userId',
				allowNull: false,
			},

		});
	};

	return Course;
};
