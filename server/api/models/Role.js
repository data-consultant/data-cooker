const { Sequelize } = require('sequelize');

const sequelize = require('../../config/database');
const { User } = require('./User');

const Role = sequelize.define('Role', {
	// id: {
	//   type: Sequelize.INTEGER,
	//   primaryKey: true,
	//   autoIncrement: true,
	// },
	roleName: {
		type: Sequelize.STRING,
		unique: true,
	},
}, {
	sequelize, // We need to pass the connection instance
	modelName: 'Role', // We need to choose the model name
	tableName: 'Roles'
});


// Role.associate = (models) => {
// 	Role.hasMany(models.User, {
// 		as: 'users',
// 		foreignKey: {
// 			fieldName: 'roleId',
// 			allowNull: true,
// 		},
// 	});

// 	Role.hasMany(models.Permission, {
// 		as: 'permissions',
// 		foreignKey: {
// 			fieldName: 'roleId',
// 			allowNull: true,
// 		},
// 	});
// };

module.exports = { Role };
