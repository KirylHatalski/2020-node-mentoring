import { Sequelize, DataTypes } from 'sequelize';

import { sequelize } from '../config'

const Permission = sequelize.define('Permission', {
	name: {
		type: DataTypes.STRING,
		allowNull: false
	}
});

const Group = sequelize.define('Group', {
	name: {
	 type: DataTypes.STRING,
	 allowNull: false
	}
});

const GroupPermissions = sequelize.define('GroupPermissions', {
  GroupId: {
    type: DataTypes.INTEGER,
    references: {
      model: Group,
      key: 'id'
    }
  },
  PermissionId: {
    type: DataTypes.INTEGER,
    references: {
      model: Permission,
      key: 'id'
    }
  }
});

Permission.belongsToMany(Group, { through: 'GroupPermissions' });
Group.belongsToMany(Permission, { through: 'GroupPermissions' });
GroupPermissions.belongsTo(Group);
GroupPermissions.belongsTo(Permission);
Group.hasMany(GroupPermissions);
Permission.hasMany(GroupPermissions);

export { Group, Permission, GroupPermissions }