import { UserService as userService } from './user'
import { GroupService as groupService } from './group'

const UserService = new userService();
const GroupService = new groupService();

export { UserService, GroupService };

