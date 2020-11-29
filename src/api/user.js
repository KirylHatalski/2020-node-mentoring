import { UserService as User } from '../services'
import { logger, loggingHandler } from '../loaders'

const userRoutesHandler = callback => loggingHandler('User', callback)

export default function userRoutes(app) {

	app.route('/user/:id')
		.get(userRoutesHandler((req, res) => User.get(req.params.id)))
		.delete(userRoutesHandler((req, res) => User.deleteUser(req.params.id)))
		.patch(userRoutesHandler((req, res) => User.patch(req.params.id, req.query)))

	app.post('/user', userRoutesHandler((req, res) => User.add(req.query)))

	app.get('/users', userRoutesHandler((req, res) => User.getAll()));

	app.get('/users/:limit', userRoutesHandler((req, res) => User.getAllLimit(req.params.limit, req.query || null)))
}