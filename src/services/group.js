import { sequelize } from '../config'

import { Group, Permission, GroupPermissions, UserGroups } from '../models'
import error from '../config'

export class GroupService {
	constructor(){
		this.group = null;
	}

  async count() {
    return await Group.count()
  }

  async get(id) {
  		return await Group.findOne({ where: {id: id} })
  	}

  async getAll() {
    return await Group.findAll()
  }

  async deleteGroup(id) {
	  try {
         return await sequelize.transaction(async t => {
	         await Group.destroy({ where: {id: id} }, { transaction: t })
	         await UserGroups.destroy({ where: {GroupId: id} }, { transaction: t })
         })
      } catch (error) {
        throw error
      }
  }

  async patch(id, query) {
    if(query.permissions) {
		  await GroupPermissions.destroy({ attributes: ['id'], where: { GroupId: id }})
		  const permissions = await Permission.findAll({ attributes: ['id'], where: { name: query.permissions.split(',') }})
		  const permissionsGroup = permissions.map(perm => ({ GroupId: id, PermissionId: perm.toJSON().id }))
		  await GroupPermissions.bulkCreate(permissionsGroup)
    }
    if(query.name) {
		  return await Group.update({ name: query.name }, { where: { id: id } })
    }
  }

  async add(query) {
    const permissions = await Permission.findAll({ attributes: ['id'], where: { name: query.permissions.split(',') }})
    const group = await Group.create({ name: query.name })
    const permissionsGroup = permissions.map(perm => ({ GroupId: group.toJSON().id, PermissionId: perm.toJSON().id }))
    return await GroupPermissions.bulkCreate(permissionsGroup)
  }

  async addUsersToGroup(groupId, userIds) {
    const usersGroup = userIds.split(',').map(user => ({ GroupId: groupId, UserId: user }))
    try {
       return await sequelize.transaction(async t => await UserGroups.bulkCreate(usersGroup, { transaction: t }))
    } catch (error) {
      throw error
    }
  }
}