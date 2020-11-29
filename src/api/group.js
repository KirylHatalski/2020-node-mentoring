import { GroupService as Group } from '../services';
import { logger, loggingHandler } from '../loaders';

const groupRoutesHandler = callback => loggingHandler('Group', callback)

export default function groupRoutes(app) {
	app.route('/group/:id')
		.get(groupRoutesHandler((req, res) => Group.get(req.params.id)))
		.delete(groupRoutesHandler((req, res) => Group.deleteGroup(req.params.id)))
		.patch(groupRoutesHandler((req, res) => Group.patch(req.params.id, req.query)))

	app.post('/group', groupRoutesHandler((req, res) => Group.add(req.query)))

	app.post('/group/:id/users/:ids', groupRoutesHandler((req, res) => Group.addUsersToGroup(req.params.id, req.params.ids)))

	app.get('/groups', groupRoutesHandler((req, res) => Group.getAll()))
}