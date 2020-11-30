import { UserService as userService } from './user'
import { GroupService as groupService } from './group'
import { LoginService as loginService } from './login'

const UserService = new userService();
const GroupService = new groupService();
const LoginService = new loginService();

export { UserService, GroupService, LoginService };

