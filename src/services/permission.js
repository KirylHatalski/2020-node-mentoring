import { Op } from 'sequelize';
import { v4 as uuid } from 'uuid';

import { Group, Permission } from '../models'
import error from '../config'

export class PermissionService {
	constructor(){
		this.permission = null;
	}

  async count() {
    return await Permission.count()
  }
}