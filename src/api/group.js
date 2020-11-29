import { GroupService as Group } from '../services';

export default function groupRoutes(app) {
	app.route('/group/:id')
		.get((req, res) => {
			Group.get(req.params.id)
				.then(user => res.send(user))
				.catch(err => res.status(400).send(err))
		})
		.delete((req, res) => {
			Group.deleteGroup(req.params.id)
				.then(() => res.sendStatus(200))
	      .catch(err => res.status(400).send(err))
		})
		.patch((req, res) => {
			Group.patch(req.params.id, req.query)
	      .then(() => res.sendStatus(200))
	      .catch(err => res.status(400).send(err))
    })

	app.post('/group', (req, res) => {
		Group.add(req.query)
			.then(() => res.sendStatus(200))
		  .catch(err => res.status(400).send(err))
	})

	app.post('/group/:id/users/:ids', (req, res) => {
  		Group.addUsersToGroup(req.params.id, req.params.ids)
  			.then(() => res.sendStatus(200))
  		  .catch(err => res.status(400).send(err))
  	})

	app.get('/groups', (req, res) => {
	  Group.getAll()
      .then(groups => res.send(groups))
      .catch(err => res.status(400).send(err))
	});
}