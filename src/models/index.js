import { sequelize } from '../config'

import { User, UserGroups } from './user'
import { Group, Permission, GroupPermissions } from './group'

(async () => {
  await sequelize.sync();
})();

export { User, Group, Permission, GroupPermissions, UserGroups };