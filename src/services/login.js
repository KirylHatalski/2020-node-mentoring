import { Op } from 'sequelize';
import { v4 as uuid } from 'uuid';


export class LoginService {
	constructor(){
		this.login = null;
		this.password = null;
	}

  async login(username, password)() {
//    return await Permission.count()
  }
}