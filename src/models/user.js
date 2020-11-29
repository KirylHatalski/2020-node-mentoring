import { Sequelize, DataTypes } from 'sequelize'

import { sequelize } from '../config'
import { Group } from './group'

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

export const UserGroups = sequelize.define('UserGroups', {
  GroupId: {
    type: DataTypes.INTEGER,
    references: {
      model: Group,
      key: 'id'
    }
  },
  UserId: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id'
    }
  }
});

Group.belongsToMany(User, { through: 'UserGroups' });
User.belongsToMany(Group, { through: 'UserGroups' });
UserGroups.belongsTo(Group);
UserGroups.belongsTo(User);
Group.hasMany(UserGroups);
User.hasMany(UserGroups);
