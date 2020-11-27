import { UserService as User } from '../services';

export default function userRoutes(app) {
	app.route('/user/:id')
		.get((req, res) => {
			User.get(req.params.id)
				.then(user => res.send(user))
				.catch(() => res.sendStatus(400))
		})
		.delete((req, res) => {
			User.deleteUser(req.params.id)
				.then(() => res.sendStatus(200))
	      .catch(() => res.sendStatus(400))
		})
		.patch((req, res) => {
			User.patch(req.params.id, req.query)
	      .then(() => res.sendStatus(200))
	      .catch(() => res.sendStatus(400))
    })

	app.post('/user', (req, res) => {
		User.add(req.query)
			.then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(400))
	})

	app.get('/users', (req, res) => {
	  User.getAll()
      .then(users => res.send(users))
      .catch(() => res.sendStatus(400))
	});

	app.get('/users/:limit', (req, res) => {
		User.getAllLimit(req.params.limit, req.query || null)
      .then(users => res.send(users))
      .catch(() => res.sendStatus(400))
	})
}