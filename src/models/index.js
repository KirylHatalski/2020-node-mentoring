import { User } from './user'
import { sequelize } from '../config'

(async () => {
  await sequelize.sync();
})();

export { User };