import { LoginService as Login } from '../services'
import { logger, loggingHandler, checkToken } from '../loaders'

//const userRoutesHandler = callback => loggingHandler('User', callback)

export default function loginRoute(app) {
	app.post('/login', (req, res) => {
		Login.login(req.body.login, req.body.password)
			.then(token => res.send(token))
			.catch(err => {console.log(err);res.status(403).send(err)})
	});
}
