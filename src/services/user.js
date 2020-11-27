import { Op } from 'sequelize';
import { v4 as uuid } from 'uuid';

import { User } from '../models'
import error from '../config'

export class UserService {
	constructor(){
		this.user = null;
	}

	async get(id) {
		this.user = await User.findOne({ where: {id: id} })
		if(this.user.isDeleted) throw new Error(error.userDeleted);
    return this.user;
	}

	async getAll() {
    return await User.findAll({ where: { isDeleted: false }, order: [['id', 'ASC']] })
  }

  async getAllLimit(limit, fields) {
	  let params = { limit: limit }

	  if(fields) {
		  let _fields = fields;
	    for(let field in _fields) {
	      fields[field]={[Op.like]: `%${_fields[field]}%`};
	    }
	    params = {...params, where: _fields }
	  }

    return await User.findAll( params )
  }

	async deleteUser(id) {
    return await User.update({ isDeleted: true }, { where: {id: id, isDeleted: false }})
  }

  async patch(id, query) {
	  return await User.update(query, { where: {id: id,  isDeleted: false } })
  }

  async add(query) {
    return await User.create({ ...query, id: uuid() })
  }

  async count() {
    return await User.count()
  }
}