import { createHash } from 'crypto'
import jwt from 'jsonwebtoken'

import { configs } from '../config'
import { User } from '../models'

export class LoginService {
	constructor(){
		this.user = null
		this.password = null
	}

  async login(username, password) {
		this.user = await User.findOne({where: { login: username }})
		this.password = this.encrypt(password)
		if(!this.user || this.user.password !== this.password) {
			throw new Error('Failed to find user');
		}
		return await jwt.sign({ "sub": this.user.id, isDeleted: false }, configs.SECRET_TOKEN, { expiresIn: 60 })
  }

  encrypt(string){
		return createHash("sha256").update(string).digest("hex");
	}
}
