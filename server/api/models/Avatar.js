// const User = require("./user");

const tableName = 'Avatars';

module.exports = (sequelize, DataTypes) => {
	const Avatar = sequelize.define('Avatar', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		avatarData: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a avatar Data',
				},
			},
		},
	}, { tableName });

	Avatar.associate = (models) => {
		// define association between tables
		// a "avatar" has many "users"
		Avatar.hasMany(models.User, {
			as: 'user',
			foreignKey: {
				fieldName: 'avatarId',
				allowNull: true,
			},
		});
	};

	return Avatar;
};
