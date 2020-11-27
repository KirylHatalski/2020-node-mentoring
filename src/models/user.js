import { Sequelize, DataTypes } from 'sequelize';

import { sequelize } from '../config'

export const User = sequelize.define('User', {
	id: {
	 type: DataTypes.UUID,
	 primaryKey: true,
	 allowNull: false,
	 unique: true
	},
	login: {
	 type: DataTypes.STRING,
	 allowNull: false
	},
	password: {
	 type: DataTypes.STRING,
	 allowNull: false
	},
	age: {
	 type: DataTypes.INTEGER,
	 allowNull: false
	},
	isDeleted: {
   type: DataTypes.BOOLEAN,
   allowNull: false,
   defaultValue: false
  }
});