import { readFile } from 'fs'
import path from 'path'
import https from 'https'

import { configs, sequelize } from '../config'
import { UserService } from '../services';
import { User, Permission } from '../models'
import { logger } from '../loaders';

async function initUserList(model){
		await https.get('https://next.json-generator.com/api/json/get/NJRbxyC5K', (res) => {
		    let body = '';
		    res.on('data', (generated) => {
		        body+=generated;
		    });
		    res.on('end', () => {
		        model.bulkCreate(JSON.parse(body));
		    });
		})
		.on('error', (e) => {
		  logger.error("json api fails, trying to load local JSON");
		    readFile(path.join(`${__dirname}/data/users.json`), 'utf8', (err, generated) => {
		      if (err) {
		        if (err.code === 'ENOENT') {
		          logger.error('users.json does not exist');
		          return;
		        }
		        throw err;
		      }
          model.bulkCreate(JSON.parse(generated))
		      logger.info('Users used from local store')
		    });
		});
}

async function initPermissionList(model) {
	const permissions = ['read', 'write', 'delete', 'share', 'upload_files'];
	permissions.map(perm => model.findOrCreate({where: { name: perm }}));
}

async function runDB(){
		try {
				await sequelize.authenticate();
				logger.info('Connection has been established successfully.')

        UserService.count().catch(err => {
          logger.error(err)
          logger.warn('DB is empty, start filling from generated content')
	        initUserList(User)
        })
        initPermissionList(Permission)
		} catch (error) {
				logger.error('Unable to connect to the database:', error)
		}
}

export { runDB };
