import { Sequelize } from 'sequelize';
import { configs } from './configs';

const DB = configs.DB;

export const sequelize = new Sequelize('nmp_db', DB.login, DB.password, DB.settings, { logging: false });